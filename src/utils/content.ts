/**
 * Site copy: English + Traditional Chinese (繁體).
 * Chinese is DRAFT until Cantonese native lock. Ported from design-build content.js
 * with Canadian English house style (no em-dashes).
 */

import type { Locale } from './i18n';

export type HealthPlank = {
  letter: string;
  labelEn: string;
  labelZh: string;
  bodyEn: string;
  bodyZh: string;
};

export const HEALTH_PLANKS: HealthPlank[] = [
  {
    letter: 'H',
    labelEn: 'Housing',
    labelZh: '住房',
    bodyEn: 'Stable, dignified homes are the foundation of a healthy community.',
    bodyZh: '安穩而有尊嚴的居所，是健康社區的基礎。',
  },
  {
    letter: 'E',
    labelEn: 'Education',
    labelZh: '教育',
    bodyEn:
      'Lifelong learning and clear health information, so families can find and use services across languages and generations.',
    bodyZh: '終身學習與清晰的健康資訊，讓不同語言、不同世代的家庭都能找到並使用所需服務。',
  },
  {
    letter: 'A',
    labelEn: 'Advocacy',
    labelZh: '為您發聲',
    bodyEn:
      'Your Ward, Your Voice. Yu advocates directly for you, ensuring your voice and your needs drive decisions.',
    bodyZh: '您的選區，您的聲音。余浩輝直接為您發聲，讓您的需要主導決策。',
  },
  {
    letter: 'L',
    labelEn: 'Living Standards',
    labelZh: '生活質量',
    bodyEn:
      'Parks, recreation, safety, and the small municipal fixes that make a neighbourhood feel cared for.',
    bodyZh: '公園、康樂、安全，以及讓社區倍感關懷的每一項市政小修繕。',
  },
  {
    letter: 'T',
    labelEn: 'Technology',
    labelZh: '科技',
    bodyEn:
      'Practical tools that connect residents to information and to each other, without leaving anyone behind.',
    bodyZh: '以實用工具連結居民與資訊、連結彼此，不讓任何人掉隊。',
  },
  {
    letter: 'H',
    labelEn: 'Hospitality',
    labelZh: '好客共融',
    bodyEn:
      'A Ward 2 that welcomes newcomers and long-time residents alike, and builds belonging in public life.',
    bodyZh: '一個歡迎新移民與老街坊的第二選區，在公共生活中建立歸屬感。',
  },
];

export const OFFICE = {
  line1: '1550 16th Ave, Unit A11',
  line2: 'Richmond Hill, ON L4B 3K9',
  email: 'hello@vote4yu.ca',
  donateEmail: 'donate@vote4yu.ca',
};

const en = {
  meta: {
    siteTitle: 'VOTE 4 YU: Haohui Yu for Markham Ward 2',
    siteDescription:
      'Haohui Yu 余浩輝 is a candidate for Markham City Council, Ward 2, in the 2026 municipal election, running on a health-first HEALTH platform.',
  },
  nav: {
    homeZh: '首頁',
    homeEn: 'Home',
    platformZh: '政綱',
    platformEn: 'Platform',
    aboutZh: '關於',
    aboutEn: 'About',
    eventsZh: '活動與消息',
    eventsEn: 'Events & News',
    involvedZh: '參與',
    involvedEn: 'Get Involved',
    donate: 'Donate',
    langEn: 'EN',
    langZh: '繁體',
    menu: 'Menu',
  },
  common: {
    connectTitle: 'Your Ward, Your Voice.',
    connectBody:
      'Doorstep conversations, WeChat groups, community meetings. Tell Yu what matters on your street.',
    connectScan: 'Scan to add WeChat',
    connectHandle: '@VOTE4YU_',
    connectPlatforms: 'WeChat · 小紅書 · Facebook · Instagram · X · Reddit',
    connectQrAlt: 'WeChat QR code to add Vote 4 Yu',
    socialInstagram: 'https://www.instagram.com/',
    socialFacebook: 'https://www.facebook.com/',
    socialWechat: '#wechat',
    socialRednote: 'https://www.xiaohongshu.com/',
    socialX: 'https://x.com/',
    socialReddit: 'https://www.reddit.com/',
    legal: 'Authorized by the official agent of the Haohui Yu campaign',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    draftBanner: '',
    officeLabel: 'Campaign office',
    emailLabel: 'Email',
    donateLabel: 'Donate by e-Transfer',
    wechat: 'WeChat',
    followYu: "Follow Yu's Journey",
    trackProgress: 'Track Progress',
    talkToYu: 'Talk to Yu',
    vote4yu: 'VOTE 4 YU',
    required: 'required',
    sending: 'Sending…',
    sent: 'Thank you. We received your message.',
    sendError: 'Something went wrong. Please email hello@vote4yu.ca.',
    formsUnavailable:
      'Form submissions are not configured yet. Please email hello@vote4yu.ca.',
  },
  home: {
    commitTitle: 'Commit to Vote',
    commitSub: 'Add your name now to show your support for HEALTHY Markham',
    firstName: 'First Name',
    lastName: 'Last Name',
    postal: 'Postal Code',
    mobile: 'Mobile Phone',
    email: 'Email',
    consent:
      'By submitting, you agree to receive campaign updates by email or text. Message and data rates may apply. You can unsubscribe anytime. See our Privacy Policy and Terms.',
    submit: 'VOTE 4 YU',
    slogan: 'Strong, Healthy Markham!',
    howToVoteZh: '如何投票',
    howToVoteEn: 'How to vote',
    registerToday: 'Register Today',
    voteOfficial: 'Read more on markham.ca',
    voteSteps: [
      {
        titleZh: '登記',
        titleEn: 'Register',
        body: "Check that you're on Markham's voters' list. You can check and update your registration online, at the Civic Centre, or at any voting place.",
        cta: 'Register today',
        href: 'https://markham.voterservices.ca/index/1936',
      },
      {
        titleZh: '投票',
        titleEn: 'Vote Oct 16–26',
        body: 'Vote online from anywhere Oct 16–26, or at a voting place Oct 23–26. Your voter information letter, arriving in early October, explains how.',
        cta: 'Ways to vote',
        href: 'https://www.markham.ca/elections/voting/ways-vote',
      },
      {
        titleZh: '捐款回贈',
        titleEn: 'Donation rebate',
        body: 'Eligible Markham residents who donate $50 or more can claim 75% back from the City, up to $150. Conditions apply.',
        cta: 'Rebate details',
        href: 'https://www.markham.ca/elections/candidates-and-third-party-advertisers/contribution-rebate-program',
      },
    ],
    platformTitle: 'The HEALTH platform',
    platformSub: 'Six commitments for Ward 2',
    platformTrack:
      'Haohui Yu 余浩輝 has helped more than 6,000 people in Markham get healthier and stronger, drawing on a background in fitness, technology and entrepreneurship.',
    platformInvite:
      "Follow Yu's journey to serve Markham Ward 2, and tell him what you need. Track progress on each HEALTH commitment, or talk with Yu directly.",
    journeyTitle: "Follow Yu's journey",
    seeAllNews: 'See all news',
    readFull: 'Read full article',
    donateTitle: 'Donate to the campaign',
    donateSub:
      'Eligible Markham residents can claim 75% back as a City rebate, up to $150. A $200 gift maximises that rebate.',
    donateCta: 'Donate now',
    donateRecommended: 'Best rebate',
  },
  about: {
    badge: 'About',
    heroTitle: 'Introducing 余浩輝 Haohui Yu',
    heroIntro:
      'Coach, technologist and entrepreneur. Yu has helped more than 6,000 people in Markham get healthier and stronger, and is running to bring that same energy to Ward 2.',
    interviewCta: 'Interview Yu',
    followJourneyCta: "Follow Yu's Journey",
    storyTitle: "Yu's story",
    storyParas: [
      'Born in Guangzhou, China and came to study in Canada in 2009 when he was 16.',
      'During Yu\'s career in health and fitness, he works closely with government, NGO and private community health providers.',
      'Besides his close cooperation with professional health providers, he also is a dedicated and reputable professional fitness trainer and entrepreneur. Yu and his team of fitness professionals intensely study the needs of each trainee and have provided exceptional personalised fitness services to more than 6,000 trainees in Markham in the past 10 years.',
      'Yu expresses his interest and belief in agentic AI by participating in Richmond Hill local AI robotics company MARI. That knowledge can help raise living standards and socio-economic growth in Markham.',
      'After more than 5 years of study in community improvement related topics and 10 years of working with people from all walks of life, Yu is ready to work diligently and closely with the people of Markham, combining his expertise and experience to contribute to the continued growth of the city.',
    ],
    storyCta: 'Read the HEALTH platform',
  },
  journey: {
    badge: 'Journey',
    title: "Yu's journey",
    intro: 'Milestones from the campaign trail and community work in Ward 2.',
  },
  platform: {
    badge: 'Platform',
    title: 'The HEALTH platform',
    body: 'Six commitments for Ward 2. Each one has an open comment line: tell Yu what it should mean on your street, and a progress note kept up to date through the campaign and beyond.',
    seeProgress: 'See progress',
  },
  progress: {
    badge: 'Progress',
    title: 'Track progress',
    intro: 'Open notes on how each HEALTH commitment is moving forward.',
    items: [
      {
        date: '2026-06-10',
        title: 'HEALTH platform launches',
        body: 'Six commitments published for Ward 2: Housing, Education, Advocacy, Living Standards, Technology, Hospitality.',
      },
      {
        date: '2026-07-15',
        title: 'Nomination filed',
        body: 'Haohui Yu 余浩輝 is on the ballot for Markham Ward 2 Councillor.',
      },
      {
        date: '2026-08-18',
        title: 'Campaign office opens',
        body: 'Drop by for a lawn sign, to meet the team, or to say hello.',
      },
    ],
  },
  talk: {
    badge: 'Talk',
    title: 'Talk to Yu',
    body1:
      'Have a concern about housing, education, advocacy, living standards, technology or hospitality? Message Yu. He reads every note and replies by email.',
    name: 'Name (optional)',
    address: 'Address (optional)',
    category: 'Category',
    categoryPh: 'Choose a category',
    comments: 'Comments',
    send: 'Send to Yu',
    errRequired: 'Please choose a category and add your comments.',
  },
  interview: {
    badge: 'Media',
    title: 'Interview Yu',
    body: 'For interviews, comments and press requests, contact the campaign team.',
    name: 'Name',
    outlet: 'Outlet / organisation',
    email: 'Email',
    topic: 'Topic',
    send: 'Request interview',
  },
  events: {
    badge: 'Events & News',
    title: 'Events & News',
    body: 'Public campaign events on the calendar, plus journey updates and news from the trail.',
    subCalendar: 'Subscribe by email',
    openCalendar: 'Open public calendar',
    tabEvents: 'Upcoming events',
    tabNews: 'Updates & news',
    tabJourney: "Yu's journey",
    hostCard:
      'Interested in hosting an event at your business? Contact campaign manager Amanda at amanda@vote4yu.ca.',
    partnerCta: 'Email Amanda',
    rsvp: 'RSVP',
    events: [
      {
        date: 'Sep 12',
        time: '9:00 AM',
        tag: 'Run',
        title: 'Community morning run',
        where: 'Milliken Mills Park; all paces welcome',
      },
      {
        date: 'Sep 20',
        time: '2:00 PM',
        tag: 'Meet',
        title: 'Ward 2 meet & greet',
        where: 'Aaniin Community Centre, Room B',
      },
      {
        date: 'Oct 4',
        time: '10:00 AM',
        tag: 'Walk',
        title: 'Main street walk & talk',
        where: 'Meet at Kennedy Rd & Denison St',
      },
    ],
  },
  subscribe: {
    badge: 'Calendar',
    title: 'Subscribe to the calendar',
    body: 'Add campaign events to your calendar, or leave your email for reminders.',
    email: 'Email',
    submit: 'Subscribe',
    icsNote: 'ICS feed coming soon. For now, email us or check Events & News.',
  },
  involved: {
    badge: 'Get involved',
    title: 'Build a strong, healthy Markham with Yu',
    body: 'Three ways to help: donate, partner your business, or volunteer your time.',
    donateTitle: 'Donate',
    donateBody:
      'Campaigns run on neighbours, not corporations. Contributions from Markham residents fund signs, flyers and community events across Ward 2. Live in Markham and donate $50 or more? You can apply for a rebate from the City of Markham; some conditions apply.',
    donateCta: 'Donate',
    partnerTitle: 'Business partnership',
    partnerBody:
      'We are looking for businesses that want to build a healthy Markham together: sponsor a community run, host a meetup, or put a sign in your window. Contact campaign manager Amanda at amanda@vote4yu.ca.',
    partnerCta: 'Email Amanda',
    volTitle: 'Volunteer',
    volBody:
      'We are looking for people who care about building a healthier and stronger Markham. A couple of hours makes a difference.',
    volCta: 'Sign up to volunteer',
    mediaTitle: 'Media inquiries',
    mediaBody: 'For interviews, comments and press requests, contact the campaign team.',
    mediaCta: 'Contact for interviews',
  },
  volunteer: {
    badge: 'Volunteer',
    title: 'Volunteer with Yu',
    body: 'Tell us how you can help. We will follow up by email.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone (optional)',
    interests: 'How would you like to help?',
    send: 'Sign up',
  },
  business: {
    badge: 'Business',
    title: 'Partner with the campaign',
    body: 'Sponsor an event, host a meetup, or display a lawn sign.',
    name: 'Contact name',
    business: 'Business name',
    email: 'Email',
    message: 'How would you like to partner?',
    send: 'Send',
  },
  donate: {
    badge: 'Donate',
    title: 'Donate to the campaign',
    subtitle: 'It only takes a few minutes',
    stepAmount: 'Amount',
    stepContact: 'Your details',
    stepPay: 'E-Transfer',
    amountLabel: 'Choose an amount',
    custom: 'Custom amount',
    next: 'Continue',
    back: 'Back',
    name: 'Full name',
    email: 'Email',
    postal: 'Postal code',
    emtTitle: 'Send an Interac e-Transfer',
    emtBody: 'Send your contribution to:',
    emtMemo: 'Suggested memo: your name and postal code',
    emtOffice: 'Or visit the campaign office:',
    rebateTitle: 'Donation rebate',
    rebateBody:
      'Eligible Markham voters and permanent residents living in Markham who donate $50 or more can claim 75% back from the City, up to $150 per election. A $200 gift maximises that rebate. Haohui Yu is a participating Ward 2 candidate. Confirm details on markham.ca.',
    rebateNone: 'No City rebate under $50',
    rebateLine: 'Estimated City rebate',
    recommended: 'Best rebate',
    logIntent: 'Save my details so the campaign can thank me',
    done: 'I have sent my e-Transfer',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: September 2026',
    sections: [
      {
        h: 'Who we are',
        p: [
          'This website is operated by the campaign of Haohui Yu, a candidate for Markham Ward 2 in the 2026 City of Markham municipal election. In this policy, "we," "us," and "the campaign" mean the Haohui Yu Campaign.',
          'We can be reached at hello@vote4yu.ca.',
        ],
      },
      {
        h: 'What information we collect',
        p: [
          'We only collect information you choose to give us, plus basic technical information about your visit.',
          'Information you give us directly may include name, email, phone, postal code, address, and messages submitted through our forms.',
          'Information collected automatically may include IP address, browser type, and pages visited (via standard hosting and analytics tools, if enabled).',
        ],
      },
      {
        h: 'Why we collect it',
        p: [
          'We use your information to respond to you, organise volunteers and events, process contribution intents, send campaign updates you asked for, and meet legal record-keeping duties.',
          'We do not use your information for any commercial purpose.',
        ],
      },
      {
        h: 'Who we share it with',
        p: [
          'We do not sell, rent, or trade your personal information.',
          'We share it only with service providers who help us run the campaign (for example form or spreadsheet tools, email, hosting) and as required by law.',
          'Some providers may store data outside Canada.',
        ],
      },
      {
        h: 'Retention and security',
        p: [
          'We keep your information for the length of the campaign and as long afterwards as needed for record-keeping and financial reporting. Contribution records are kept for the period required by the Municipal Elections Act, 1996.',
          'We use reputable providers and limit access to staff and volunteers who need it. No website can promise perfect security.',
        ],
      },
      {
        h: 'Your choices',
        p: [
          'You can ask us to correct or delete your information, or stop campaign messages, by emailing hello@vote4yu.ca. We will respond within 30 days.',
        ],
      },
      {
        h: 'Changes',
        p: ['We may update this policy. If we do, we will change the "Last updated" date on this page.'],
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated: September 2026',
    sections: [
      {
        h: 'Using this site',
        p: [
          'By using vote4yu.ca you agree to these terms. This site is operated by the Haohui Yu campaign for the 2026 Markham municipal election.',
        ],
      },
      {
        h: 'Commit to Vote and other forms',
        p: [
          'When you submit a form, you confirm the information is accurate and that you consent to the campaign contacting you about the election as described in our Privacy Policy.',
          'Submitting does not create a legal obligation to vote for any candidate.',
        ],
      },
      {
        h: 'Donations',
        p: [
          'Contributions by Interac e-Transfer to donate@vote4yu.ca are voluntary. Contribution rules under Ontario municipal election finance law apply. Rebate eligibility is determined by the City of Markham, not by this campaign.',
        ],
      },
      {
        h: 'Content',
        p: [
          'Platform and policy copy may be updated during the campaign. Links to markham.ca and other third-party sites are provided for convenience; we do not control those sites.',
        ],
      },
      {
        h: 'Contact',
        p: ['Questions: hello@vote4yu.ca.'],
      },
    ],
  },
  footer: {
    platform: 'Platform',
    campaign: 'Campaign',
    contact: 'Contact',
    health: 'HEALTH platform',
    about: 'About Haohui',
    progress: 'Track progress',
    talk: 'Talk to Yu',
    events: 'Events & News',
    involved: 'Get involved',
    donate: 'Donate',
    blog: 'Updates',
  },
};

const zhHK: typeof en = {
  meta: {
    siteTitle: 'VOTE 4 YU: 余浩輝參選萬錦市第二選區',
    siteDescription:
      '余浩輝是 2026 萬錦市選舉第二選區市議員候選人，以健康為核心的 HEALTH 政綱參選。[DRAFT: 待粵語母語審校]',
  },
  nav: {
    homeZh: '首頁',
    homeEn: 'Home',
    platformZh: '政綱',
    platformEn: 'Platform',
    aboutZh: '關於',
    aboutEn: 'About',
    eventsZh: '活動與消息',
    eventsEn: 'Events & News',
    involvedZh: '參與',
    involvedEn: 'Get Involved',
    donate: '捐款',
    langEn: 'EN',
    langZh: '繁體',
    menu: '選單',
  },
  common: {
    connectTitle: '風雨兼行，為您發聲。',
    connectBody: '挨家挨戶傾談、微信群、社區聚會。告訴余浩輝，您街上最關心的事。',
    connectScan: '掃碼加微信',
    connectHandle: '@VOTE4YU_',
    connectPlatforms: 'WeChat · 小紅書 · Facebook · Instagram · X · Reddit',
    connectQrAlt: 'Vote 4 Yu 微信二維碼',
    socialInstagram: 'https://www.instagram.com/',
    socialFacebook: 'https://www.facebook.com/',
    socialWechat: '#wechat',
    socialRednote: 'https://www.xiaohongshu.com/',
    socialX: 'https://x.com/',
    socialReddit: 'https://www.reddit.com/',
    legal: '由余浩輝競選團隊官方代理人授權',
    privacy: '私隱政策',
    terms: '條款及細則',
    draftBanner: '',
    officeLabel: '競選辦公室',
    emailLabel: '電郵',
    donateLabel: '電子轉賬捐款',
    wechat: '微信',
    followYu: '關注余浩輝的旅程',
    trackProgress: '跟進進度',
    talkToYu: '與余浩輝對話',
    vote4yu: 'VOTE 4 YU',
    required: '必填',
    sending: '傳送中…',
    sent: '多謝。我們已收到您的訊息。',
    sendError: '出現問題。請電郵 hello@vote4yu.ca。',
    formsUnavailable: '網上表格尚未接通。請電郵 hello@vote4yu.ca。',
  },
  home: {
    commitTitle: '承諾投票',
    commitSub: '留下姓名，支持健康萬錦',
    firstName: '名',
    lastName: '姓',
    postal: '郵政編號',
    mobile: '手機',
    email: '電郵',
    consent:
      '提交即表示您同意收取競選電郵或短訊更新。標準訊息費用可能適用。您可隨時取消訂閱。詳見私隱政策與條款。',
    submit: 'VOTE 4 YU',
    slogan: '強健萬錦，健康萬錦！',
    howToVoteZh: '如何投票',
    howToVoteEn: 'How to vote',
    registerToday: '立即登記',
    voteOfficial: '於 markham.ca 閱讀更多',
    voteSteps: [
      {
        titleZh: '登記',
        titleEn: 'Register',
        body: '請確認您已在萬錦市選民名冊上。您可於網上、市政中心或任何投票站查核及更新登記。',
        cta: '查核選民名冊',
        href: 'https://markham.voterservices.ca/index/1936',
      },
      {
        titleZh: '投票',
        titleEn: 'Vote Oct 16–26',
        body: '10月16日至26日可隨時網上投票，或於10月23日至26日親身前往投票站。10月初寄出的選民信件會說明投票方法。',
        cta: '投票方式',
        href: 'https://www.markham.ca/elections/voting/ways-vote',
      },
      {
        titleZh: '捐款回贈',
        titleEn: 'Donation rebate',
        body: '合資格的萬錦居民捐款$50或以上，可向市政府申請75%回贈，最高$150（受條件限制）。',
        cta: '回贈詳情',
        href: 'https://www.markham.ca/elections/candidates-and-third-party-advertisers/contribution-rebate-program',
      },
    ],
    platformTitle: 'HEALTH 政綱',
    platformSub: '對第二選區的六項承諾',
    platformTrack:
      '余浩輝 Haohui Yu 已幫助超過6,000位萬錦居民變得更健康、更強壯，憑藉健身、科技與創業背景服務社區。',
    platformInvite:
      '關注余浩輝服務萬錦第二選區的旅程，告訴他您的需要。追蹤每項 HEALTH 承諾進度，或直接與余浩輝對話。',
    journeyTitle: '關注余浩輝的旅程',
    seeAllNews: '查看全部新聞',
    readFull: '閱讀全文',
    donateTitle: '捐助競選',
    donateSub: '合資格的萬錦居民可獲市政府75%回贈，最高$150。捐$200可獲最高回贈。',
    donateCta: '立即捐款',
    donateRecommended: '最高回贈',
  },
  about: {
    badge: '關於',
    heroTitle: '認識 余浩輝 Haohui Yu',
    heroIntro:
      '健身教練、科技人、創業者。余浩輝已幫助超過6,000位萬錦居民變得更健康、更強壯，現在他要把同樣的能量帶到第二選區。',
    interviewCta: '採訪余浩輝',
    followJourneyCta: '關注余浩輝的旅程',
    storyTitle: '余浩輝的故事',
    storyParas: [
      '余浩輝的事業始於幫助別人變得更強——先是健身教練，其後創業，打造連結社區的工具。一路走來，他以英語、廣東話和普通話服務萬錦各地的新移民、長者和年輕家庭。',
      '這段經歷讓他明白一個簡單的道理：健康的人需要健康的社區。安全的公園、用自己語言就能找到的服務，以及一位打電話就會回應的市議員。這就是他對第二選區的承諾標準。',
      '關注余浩輝服務萬錦第二選區的旅程，告訴他您的需要。',
    ],
    storyCta: '閱讀 HEALTH 政綱',
  },
  journey: {
    badge: '旅程',
    title: '余浩輝的旅程',
    intro: '競選與第二選區社區工作的里程碑。',
  },
  platform: {
    badge: '政綱',
    title: 'HEALTH 政綱',
    body: '對第二選區的六項承諾。每一項都設有意見渠道：告訴余浩輝它在您的街道上應該是什麼樣子，並附有持續更新的進度記錄。',
    seeProgress: '查看進度',
  },
  progress: {
    badge: '進度',
    title: '跟進進度',
    intro: '各項 HEALTH 承諾的公開進度記錄。',
    items: [
      {
        date: '2026-06-10',
        title: 'HEALTH 政綱發佈',
        body: '對第二選區的六項承諾：住房、教育、發聲、生活質量、科技與好客共融。',
      },
      {
        date: '2026-07-15',
        title: '正式報名參選',
        body: '余浩輝已正式成為萬錦市第二選區市議員候選人。',
      },
      {
        date: '2026-08-18',
        title: '競選辦公室開幕',
        body: '歡迎前來領取標語牌、認識團隊或打個招呼。',
      },
    ],
  },
  talk: {
    badge: '對話',
    title: '與余浩輝對話',
    body1:
      '對住房、教育、發聲、生活質量、科技或好客共融有任何關注？留言給余浩輝——他會親自閱讀，並以電郵回覆您。',
    name: '姓名（選填）',
    address: '地址（選填）',
    category: '類別',
    categoryPh: '請選擇類別',
    comments: '留言',
    send: '發送給余浩輝',
    errRequired: '請選擇類別並填寫留言。',
  },
  interview: {
    badge: '媒體',
    title: '採訪余浩輝',
    body: '如需採訪、評論或媒體資料，請聯絡競選團隊。',
    name: '姓名',
    outlet: '媒體／機構',
    email: '電郵',
    topic: '主題',
    send: '申請採訪',
  },
  events: {
    badge: '活動與消息',
    title: '活動與消息',
    body: '公開競選活動日曆，加上旅程更新與競選消息。',
    subCalendar: '電郵訂閱',
    openCalendar: '開啟公開日曆',
    tabEvents: '近期活動',
    tabNews: '最新消息',
    tabJourney: '余浩輝的旅程',
    hostCard: '有興趣在您的商戶舉辦活動？請聯絡競選經理 Amanda：amanda@vote4yu.ca。',
    partnerCta: '電郵 Amanda',
    rsvp: '報名',
    events: [
      {
        date: '9月12日',
        time: '上午9時',
        tag: '晨跑',
        title: '社區晨跑',
        where: 'Milliken Mills 公園；歡迎任何配速',
      },
      {
        date: '9月20日',
        time: '下午2時',
        tag: '見面會',
        title: '第二選區見面會',
        where: 'Aaniin 社區中心 B 室',
      },
      {
        date: '10月4日',
        time: '上午10時',
        tag: '掃街',
        title: '大街散步漫談',
        where: 'Kennedy Rd 與 Denison St 交界集合',
      },
    ],
  },
  subscribe: {
    badge: '日曆',
    title: '訂閱活動日曆',
    body: '將競選活動加入您的日曆，或留下電郵接收提醒。',
    email: '電郵',
    submit: '訂閱',
    icsNote: 'ICS 訂閱稍後推出。現可電郵我們或查看活動與消息。',
  },
  involved: {
    badge: '參與',
    title: '與余浩輝一起建設強健萬錦',
    body: '三種支持方式：捐款、商業合作，或抽空做義工。',
    donateTitle: '捐款',
    donateBody:
      '競選靠的是街坊，不是財團。萬錦居民的捐款用於第二選區的標語牌、傳單和社區活動。居於萬錦並捐款$50或以上？您可向萬錦市政府申請回贈（受條件限制）。',
    donateCta: '捐款',
    partnerTitle: '商業合作',
    partnerBody:
      '我們正尋找願意共建健康萬錦的商戶——贊助社區跑步、舉辦聚會，或在櫥窗擺放標語牌。請聯絡競選經理 Amanda：amanda@vote4yu.ca。',
    partnerCta: '電郵 Amanda',
    volTitle: '義工',
    volBody: '我們正尋找關心萬錦、想讓它更健康更強大的人。幾個小時就能帶來改變。',
    volCta: '報名做義工',
    mediaTitle: '媒體查詢',
    mediaBody: '如需採訪、評論或媒體資料，請聯絡競選團隊。',
    mediaCta: '媒體聯絡',
  },
  volunteer: {
    badge: '義工',
    title: '為余浩輝做義工',
    body: '告訴我們您可以怎樣幫忙。我們會以電郵跟進。',
    name: '姓名',
    email: '電郵',
    phone: '電話（選填）',
    interests: '您想怎樣幫忙？',
    send: '報名',
  },
  business: {
    badge: '商業',
    title: '與競選團隊合作',
    body: '贊助活動、舉辦聚會，或擺放標語牌。',
    name: '聯絡人',
    business: '商戶名稱',
    email: '電郵',
    message: '您想怎樣合作？',
    send: '傳送',
  },
  donate: {
    badge: '捐款',
    title: '支持競選',
    subtitle: '只需幾分鐘',
    stepAmount: '金額',
    stepContact: '您的資料',
    stepPay: '電子轉賬',
    amountLabel: '選擇金額',
    custom: '自訂金額',
    next: '繼續',
    back: '返回',
    name: '全名',
    email: '電郵',
    postal: '郵政編號',
    emtTitle: '以 Interac 電子轉賬捐款',
    emtBody: '請將款項轉至：',
    emtMemo: '建議備註：您的姓名與郵政編號',
    emtOffice: '或親臨競選辦公室：',
    rebateTitle: '捐款回贈',
    rebateBody:
      '合資格的萬錦選民及居於萬錦的加拿大永久居民，捐款$50或以上可向市政府申請75%回贈，每次選舉最高$150。捐$200可獲最高回贈。余浩輝為參與計劃的第二選區候選人。詳情請於 markham.ca 查閱。',
    rebateNone: '少於 $50 無市府回贈',
    rebateLine: '預計市府回贈',
    recommended: '最高回贈',
    logIntent: '保存資料以便競選團隊致謝',
    done: '我已完成電子轉賬',
  },
  privacy: {
    title: '私隱政策',
    updated: '最後更新：2026年9月',
    sections: [
      {
        h: '我們是誰',
        p: [
          '本網站由余浩輝競選團隊營運。余浩輝為 2026 萬錦市第二選區市議員候選人。本政策中的「我們」指余浩輝競選團隊。',
          '聯絡電郵：hello@vote4yu.ca。',
        ],
      },
      {
        h: '我們收集什麼資料',
        p: [
          '我們只收集您自願提供的資料，以及基本的技術瀏覽資料。',
          '您直接提供的資料可能包括姓名、電郵、電話、郵政編號、地址，以及表格留言。',
          '自動收集的資料可能包括 IP、瀏覽器類型及瀏覽頁面。',
        ],
      },
      {
        h: '為何收集',
        p: [
          '用作回覆您、組織義工與活動、處理捐款意向、發送您要求的競選更新，以及履行法定記錄責任。',
          '我們不會將您的資料用於商業用途。',
        ],
      },
      {
        h: '與誰分享',
        p: [
          '我們不會出售、出租或交易您的個人資料。',
          '只會與協助競選運作的服務供應商分享，或按法律要求披露。',
          '部分供應商可能在加拿大以外儲存資料。',
        ],
      },
      {
        h: '保存與保安',
        p: [
          '資料保存至競選期間及之後因記錄與財務申報所需的合理時間。捐款記錄按《1996年市選法》規定保存。',
          '我們使用可靠供應商，並限制僅有需要的人員存取。任何網站都無法保證絕對安全。',
        ],
      },
      {
        h: '您的選擇',
        p: ['您可電郵 hello@vote4yu.ca 要求更正、刪除資料或停止接收訊息。我們會於30日內回覆。'],
      },
      {
        h: '更改',
        p: ['我們可能更新本政策，並會更改本頁的「最後更新」日期。'],
      },
    ],
  },
  terms: {
    title: '條款及細則',
    updated: '最後更新：2026年9月',
    sections: [
      {
        h: '使用本網站',
        p: ['使用 vote4yu.ca 即表示您同意本條款。本網站由余浩輝競選團隊為 2026 萬錦市選舉而營運。'],
      },
      {
        h: '承諾投票及其他表格',
        p: [
          '提交表格即確認資料正確，並同意競選團隊按私隱政策就選舉事宜聯絡您。',
          '提交並不構成投票予任何候選人的法律義務。',
        ],
      },
      {
        h: '捐款',
        p: [
          '以 Interac 電子轉賬至 donate@vote4yu.ca 的捐款屬自願。安省市選財務法例適用。回贈資格由萬錦市政府決定，而非本競選團隊。',
        ],
      },
      {
        h: '內容',
        p: ['政綱內容可能於競選期間更新。連至 markham.ca 等第三方網站僅供參考，我們並不控制該等網站。'],
      },
      {
        h: '聯絡',
        p: ['查詢：hello@vote4yu.ca。'],
      },
    ],
  },
  footer: {
    platform: '政綱',
    campaign: '競選',
    contact: '聯絡',
    health: 'HEALTH 政綱',
    about: '關於余浩輝',
    progress: '跟進進度',
    talk: '與余浩輝對話',
    events: '活動與消息',
    involved: '參與支持',
    donate: '捐款',
    blog: '最新消息',
  },
};

export type Content = typeof en;

export function getContent(locale: Locale): Content {
  return locale === 'zh-HK' ? zhHK : en;
}

export function plankLabel(plank: HealthPlank, locale: Locale): string {
  return locale === 'zh-HK' ? plank.labelZh : plank.labelEn;
}

export function plankBody(plank: HealthPlank, locale: Locale): string {
  return locale === 'zh-HK' ? plank.bodyZh : plank.bodyEn;
}
