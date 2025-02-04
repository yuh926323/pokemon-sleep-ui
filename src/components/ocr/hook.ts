import React from 'react';

import {createWorker, OEM} from 'tesseract.js';

import {ocrLocaleToTesseract} from '@/components/ocr/const';
import {OcrState, UseOcrReturn} from '@/components/ocr/type';
import {ocrThresholdImage} from '@/components/ocr/utils';
import {OcrLocale} from '@/types/ocr/locale';


type UseOcrOpts = {
  ocrLocale: OcrLocale,
  ocrThreshold: number, // 0-255
  onError: (message: string) => void,
};

export const useOcr = ({
  ocrLocale,
  ocrThreshold,
  onError,
}: UseOcrOpts): UseOcrReturn => {
  const [state, setState] = React.useState<OcrState>({
    status: 'ready',
    progress: 0,
    text: null,
  });

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const runOcr = React.useCallback(async () => {
    const image = imageRef.current;
    if (!image) {
      onError('No image ref available');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) {
      onError('No canvas ref available');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onError('No canvas 2D context available');
      return;
    }

    if (!image.width || !image.height) {
      onError('Image is 0 dimension for either width or height');
      return;
    }

    setState({status: 'thresholding', progress: 0, text: null});
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(imageRef.current, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const processedImage = ocrThresholdImage({imageData, threshold: ocrThreshold});
    ctx.putImageData(processedImage, 0, 0);

    setState({status: 'loadingOcr', progress: 0, text: null});
    const tesseractLang = ocrLocaleToTesseract[ocrLocale];
    const worker = await createWorker(
      tesseractLang,
      OEM.DEFAULT,
      {
        logger: ({progress, status}) => {
          if (status === 'recognizing text') {
            setState({status: 'recognizing', progress: progress * 100, text: null});
          } else {
            setState({status: 'loadingOcr', progress: 0, text: null});
          }
        },
      },
    );
    await worker.setParameters({
      // 'S' could be mistakenly recognized as `$` in JP
      // 'S' could be mistakenly recognized as `§` in EN
      // https://github.com/naptha/tesseract.js/issues/831
      // @ts-ignore
      tessedit_char_blacklist: '$§',
    });

    setState({status: 'recognizing', progress: 0, text: null});
    const {data: {text}} = await worker.recognize(canvasRef.current.toDataURL('image/jpeg'));

    setState({status: 'completed', progress: 100, text});
    await worker.terminate();
  }, [ocrLocale, ocrThreshold]);

  return {state, canvasRef, imageRef, runOcr};
};
