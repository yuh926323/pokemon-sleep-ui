export const getActivationEmailContent = (activationLink: string) => {
  return [
    '(中文)',
    '感謝支持！登入網站後，點擊下面的連結即可啟用。',
    '',
    '- 點擊連結後，如果有跳轉回首頁則代表已啟用。',
    '- 連結只限點擊一次。重複點擊將會出現 "Activation Failed"。',
    '- 如果無法啟用，請 Discord 或 LINE 聯絡 @raenonx 協助處理。',
    '- 如果付費內容在訂閱期間忽然失效的話，也請透過上述管道聯絡尋求協助。',
    '- 以下連結 24 小時內有效。逾期時，請直接透過上述管道聯絡。',
    '',
    '如果還沒有加入我們的 Discord 的話，歡迎加入！ https://discord.gg/eeveesleep',
    '',
    '(English)',
    'Thanks for your support! Click on the link below to activate after logging in to the website.',
    '',
    '- If it redirects to the homepage, the link has been activated.',
    '- The link is only valid for the first click. Subsequent clicks will show "Activation Failed."',
    '- If the link keeps failing, please contact @raenonx on Discord.',
    '- If the paid content suddenly becomes inaccessible, please contact me as well.',
    '- The link expires after 24 hours. If it expired, please directly contact me.',
    '',
    'If you have not joined our Discord, feel free to join as well! https://discord.gg/eeveesleep',
    '',
    '(日本語)',
    'ご支援ありがとうございます！ サイトでログインしてから、下記のリンクを開いてアクティベートしてください。',
    '',
    '- サイトのトップページにリダイレクトされていれば、アクティベートは成功です。',
    '- リンクは1回限り有効です。再び開いても"Activation Failed"と表示されます。',
    '- アクティベートが何度もうまくいかない場合は、DiscordまたはLINEにて @RaenonX までご連絡ください。',
    '- サブスク限定コンテンツが突然失効してしまった場合も、同様にご連絡ください。',
    '- リンクの有効期限は24時間以内です。過ぎてしまった場合も同様にご連絡ください。',
    '',
    'Discordサーバーでもお待ちしています！まだのかたはぜひ。 https://discord.gg/eeveesleep',
    '',
    '(한국어)',
    '여러분의 도움에 감사를 표합니다. 사이트 로그인 후 아래 링크를 클릭하여 활성화하세요.',
    '',
    '- 홈페이지로 리디렉션된다면 광고 제거가 활성화된 것입니다.',
    '- 이 링크는 처음 클릭했을 때만 유효합니다. 이후 클릭 시에는 "Activation Failed" 라고 표시됩니다.',
    '- 링크를 계속 사용할 수 없다면 디스코드 @raenonx 로 문의해주세요.',
    '- 링크는 24시간 이후 만료됩니다. 링크를 사용하지 못했는데 만료되었다면 저에게 직접 디스코드로 연락해주세요.',
    '',
    '아직 Discord 에 가입하지 않으셨다면, 자유롭게 가입해 주세요! https://discord.gg/eeveesleep',
    '',
    activationLink,
  ].join('\n');
};
