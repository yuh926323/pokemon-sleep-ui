import {Metadata} from 'next';

import {Locale} from '@/types/next/locale';


export type GenerateMetadataParams = {
  locale: Locale,
};

export type GenerateMetadataOpts<P extends GenerateMetadataParams> = {
  params: P
};

export type GenerateMetadata<T extends GenerateMetadataParams = GenerateMetadataParams> = (
  opts: GenerateMetadataOpts<T>,
) => Promise<Metadata>;

export type GenerateStaticParamsOpts<P extends GenerateMetadataParams> = {
  params: P,
};

export type GenerateStaticParams<T extends GenerateMetadataParams = GenerateMetadataParams> = (
  opts: GenerateMetadataOpts<T>,
) => T[] | Promise<T[]>;
