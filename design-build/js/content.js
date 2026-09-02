/* Vote 4 Yu — bilingual copy.
 *
 * Ported verbatim from the Claude Design prototypes (project/*.dc.html). English is also written
 * into the HTML so the pages read correctly with JS off; this file is what the EN/中文 toggle
 * swaps in. Keys are dot paths used by data-i18n attributes, resolved against
 * {...common, ...<page>} where <page> comes from <body data-page>.
 *
 * Chinese is Traditional, matching Markham's Cantonese-speaking community. Per the design
 * system: never machine-translate new Chinese copy — have it written.
 */

window.V4Y = window.V4Y || {};

window.V4Y.content = {
  en: {
    common: {
      navAbout: "About",
      navPlatform: "Platform",
      navEvents: "Events & News",
      navInvolved: "Get Involved",
      connectTitle: "Your Ward, Your Voice.",
      connectBody: "Tell Yu what matters to you. Contact us:",
      legal: "Authorized by the official agent of the Haohui Yu campaign"
    },

    home: {
      heroCta1: "Read the Platform",
      heroCtaAbout: "About YU",
      heroCta2: "Follow YU's Journey",
      slogan: "Strong, Healthy Markham!",
      registerCta: "Register Today",
      voteOfficial: "Read more on markham.ca",
      voteSteps: [
        {
          title: "登記 Register",
          body: "Check that you're on Markham's voters' list. You can check and update your registration online, at the Civic Centre, or at any voting place.",
          cta: "Register today!"
        },
        {
          title: "投票 Vote Oct 16 - 26",
          body: "Vote online from anywhere Oct 16 - 26, or at a voting place Oct 23 - 26. Your voter information letter, arriving in early October, explains how.",
          cta: "Ways to Vote"
        },
        {
          title: "捐款回贈 Donation rebate",
          body: "Live in Markham and donate $50 or more to a council candidate? You can apply for a rebate from the City — some conditions apply.",
          cta: "Rebate Details"
        }
      ],
      platformTitle: "The HEALTH platform",
      platformSub: "Six commitments for Ward 2",
      platformCta1: "Talk to Yu",
      platformCta2: "Track Progress",
      planks: [
        { body: "Stable, dignified homes are the foundation of a healthy community." },
        { body: "Lifelong learning and clear health information, so families can find and use services across languages and generations." },
        { body: "Your Ward, Your Voice. Yu advocates directly for you, ensuring your voice and your needs drive decisions." },
        { body: "Parks, recreation, safety, and the small municipal fixes that make a neighbourhood feel cared for." },
        { body: "Practical tools that connect residents to information and to each other, without leaving anyone behind." },
        { body: "A Ward 2 that welcomes newcomers and long-time residents alike, and builds belonging in public life." }
      ],
      reelsTitle: "Follow Yu's journey",
      readFull: "Read Full Article",
      seeAllNews: "See All News",
      news: [
        {
          date: "Aug 18, 2026",
          title: "Campaign office opens",
          preview: "The Vote 4 Yu campaign office is open — drop by to pick up a sign, meet the team, or say hello."
        },
        {
          date: "Aug 2, 2026",
          title: "WeChat office hours are live",
          preview: "Yu now answers Ward 2 questions in the campaign WeChat group every Wednesday evening."
        },
        {
          date: "Jul 15, 2026",
          title: "Nomination filed for Ward 2",
          preview: "Haohui Yu 余浩輝 is officially on the ballot for Markham Ward 2 Councillor."
        }
      ]
    },

    platform: {
      heroTitleA: "The ",
      heroTitleB: " platform",
      heroBody: "Six commitments for Ward 2. Each one has an open comment line — tell Yu what it should mean on your street — and a progress note kept up to date through the campaign and beyond.",
      seeProgress: "See Progress",
      planks: [
        { body: "Stable, dignified homes are the foundation of a healthy community." },
        { body: "Lifelong learning and clear health information, so families can find and use services across languages and generations." },
        { body: "Your Ward, Your Voice. Yu advocates directly for you, ensuring your voice and your needs drive decisions." },
        { body: "Parks, recreation, safety, and the small municipal fixes that make a neighbourhood feel cared for." },
        { body: "Practical tools that connect residents to information and to each other, without leaving anyone behind." },
        { body: "A Ward 2 that welcomes newcomers and long-time residents alike, and builds belonging in public life." }
      ],
      talkTitle: "Talk to Yu",
      talkBody1: "Have a concern about housing, education, advocacy, living standards, technology or hospitality? Message Yu — he reads every note and replies to you in person by email.",
      talkBody2: "Prefer social media? Find Yu on",
      talkOr: "or",
      talkEnd: ".",
      fName: "Name (optional)",
      fAddress: "Address (optional)",
      fCategory: "Category",
      fCategoryPh: "Choose a category",
      fComments: "Comments",
      fSend: "Send to Yu",
      errRequired: "Please choose a category and add your comments."
    },

    about: {
      heroTitleA: "Introducing ",
      heroIntro: "Coach, technologist and entrepreneur. Yu has helped more than 6,000 people in Markham get healthier and stronger, and is running to bring that same energy to Ward 2.",
      interviewCta: "Interview Yu",
      followJourneyCta: "Follow Yu's Journey",
      storyTitle: "Yu's story",
      storyParas: [
        "Born in Guangzhou, China and came to study in Canada in 2009 when he was 16.",
        "During Yu's career in health and fitness, he works closely with government, NGO and private community health providers.",
        "Besides his close cooperation with professional health providers, he also is a dedicated and reputable professional fitness trainer and entrepreneur. Yu and his team of fitness professionals intensely study the needs of each trainee and have provided exceptional personalized fitness services to more than 6000 trainees in Markham in the past 10 years.",
        "Yu expresses his interest and belief in Agentic A.I. by participating in Richmond Hill local A.I. robotic company MARI. The knowledge which can contribute to increase the living standard and socio-economic growth of Markham.",
        "After more than 5 years of study in community improvement related topics and 10 years of working with people from all walks of life from different communities, Yu is ready to work diligently and closely with the people of Markham, combining his expertise and experience to contribute to the continuous growth of the city of Markham."
      ],
      storyCta: "Read the HEALTH Platform",
      reelsTitle: "Follow Yu's journey",
      readFull: "Read Full Article",
      seeAllNews: "See All News",
      news: [
        {
          date: "Aug 18, 2026",
          title: "Campaign office opens",
          preview: "The Vote 4 Yu campaign office is open — drop by to pick up a sign, meet the team, or say hello."
        },
        {
          date: "Aug 2, 2026",
          title: "WeChat office hours are live",
          preview: "Yu now answers Ward 2 questions in the campaign WeChat group every Wednesday evening."
        },
        {
          date: "Jul 15, 2026",
          title: "Nomination filed for Ward 2",
          preview: "Haohui Yu 余浩輝 is officially on the ballot for Markham Ward 2 Councillor."
        }
      ]
    },

    events: {
      heroTitle: "Meet Yu in person",
      heroBody: "Through the campaign, Yu is showing up at community events across Ward 2 — morning runs, meetups and street walks — to support the initiative of building a strong, healthy Markham. Come join him.",
      subCalendar: "Subscribe to Calendar",
      interviewCta: "Interview Yu",
      tabEvents: "Upcoming Events",
      tabJourney: "Yu's Journey",
      hostCard: "Interested in hosting Yu's event in your business?",
      partnerCta: "Partner with Yu",
      followCard: "Want to follow Yu's journey even closer?",
      followIg: "Follow Yu on Instagram",
      rsvp: "RSVP",
      readFull: "Read Full Article",
      events: [
        { date: "Sep 12", time: "9:00 AM", zh: "晨跑", title: "Community morning run", where: "Milliken Mills Park — all paces welcome" },
        { date: "Sep 20", time: "2:00 PM", zh: "見面會", title: "Ward 2 meet & greet", where: "Aaniin Community Centre, Room B" },
        { date: "Oct 4", time: "10:00 AM", zh: "掃街", title: "Main street walk & talk", where: "Meet at Kennedy Rd & Denison St" }
      ],
      articles: [
        { date: "Aug 18, 2026", title: "Campaign office opens", preview: "The Vote 4 Yu campaign office is open — drop by to pick up a sign, meet the team, or say hello." },
        { date: "Aug 2, 2026", title: "WeChat office hours are live", preview: "Yu now answers Ward 2 questions in the campaign WeChat group every Wednesday evening." },
        { date: "Jul 15, 2026", title: "Nomination filed for Ward 2", preview: "Haohui Yu 余浩輝 is officially on the ballot for Markham Ward 2 Councillor." },
        { date: "Jun 28, 2026", title: "200 neighbours join the community run", preview: "The biggest turnout yet for the monthly Ward 2 morning run, from Milliken Mills Park." },
        { date: "Jun 10, 2026", title: "The HEALTH platform launches", preview: "Six commitments for Ward 2 — housing, education, advocacy, living standards, technology and hospitality." },
        { date: "May 24, 2026", title: "Volunteer training day", preview: "Canvassing, events and online teams got together for a full day of training and planning." },
        { date: "May 3, 2026", title: "Spring park clean-up in Ward 2", preview: "Neighbours and volunteers cleaned up three parks in one morning — and mapped fixes for the City." },
        { date: "Apr 12, 2026", title: "Yu on local radio: healthy cities", preview: "A conversation about what fitness coaching taught Yu about building healthy neighbourhoods." }
      ]
    },

    involved: {
      heroTitleA: "Build a strong, healthy Markham with ",
      heroTitleB: "",
      heroBody: "Three ways to help: donate, partner your business, or volunteer your time.",
      donateTitle: "Donate",
      donateBody: "Campaigns run on neighbours, not corporations. Contributions from Markham residents fund signs, flyers and community events across Ward 2. Live in Markham and donate $50 or more? You can apply for a rebate from the City of Markham — some conditions apply.",
      donateCta: "Donate",
      partnerTitle: "Business partnership",
      partnerBody: "We are looking for businesses that want to build a healthy Markham together — sponsor a community run, host a meetup, or put a sign in your window.",
      partnerCta: "Contact the Campaign",
      volTitle: "Volunteer",
      volBody: "We are looking for people who care about building a healthier and stronger Markham. A couple of hours makes a difference.",
      volCta: "Sign Up to Volunteer",
      mediaTitle: "Media Inquiries",
      mediaBody: "For interviews, comments and press requests, contact the campaign team. More details coming soon.",
      mediaCta: "Contact for Interviews"
    }
  },

  zh: {
    common: {
      navAbout: "關於",
      navPlatform: "政綱",
      navEvents: "活動與新聞",
      navInvolved: "參與支持",
      connectTitle: "風雨兼行，為您發聲。",
      connectBody: "告訴余浩輝您最關心的事。聯絡我們：",
      legal: "由余浩輝競選團隊官方代理人授權"
    },

    home: {
      heroCta1: "閱讀政綱",
      heroCtaAbout: "認識余浩輝",
      heroCta2: "關注余浩輝的旅程",
      slogan: "強健萬錦，健康萬錦！",
      registerCta: "立即登記",
      voteOfficial: "於 markham.ca 閱讀更多",
      voteSteps: [
        {
          title: "登記 Register",
          body: "請確認您已在萬錦市選民名冊上。您可於網上、市政中心或任何投票站查核及更新登記。",
          cta: "查核選民名冊"
        },
        {
          title: "投票 Vote",
          body: "10月16日至26日可隨時網上投票，或於10月23日至26日親身前往投票站。10月初寄出的選民信件會說明投票方法。",
          cta: "投票方式"
        },
        {
          title: "捐款回贈 Rebate",
          body: "居於萬錦並向市議員候選人捐款$50或以上？您可向市政府申請回贈（受條件限制）。",
          cta: "回贈詳情"
        }
      ],
      platformTitle: "HEALTH 政綱",
      platformSub: "對第二選區的六項承諾",
      platformCta1: "與余浩輝對話",
      platformCta2: "跟進進度",
      planks: [
        { body: "安穩而有尊嚴的居所，是健康社區的基礎。" },
        { body: "終身學習與清晰的健康資訊，讓不同語言、不同世代的家庭都能找到並使用所需服務。" },
        { body: "您的選區，您的聲音。余浩輝直接為您發聲，讓您的需要主導決策。" },
        { body: "公園、康樂、安全，以及讓社區倍感關懷的每一項市政小修繕。" },
        { body: "以實用工具連結居民與資訊、連結彼此，不讓任何人掉隊。" },
        { body: "一個歡迎新移民與老街坊的第二選區，在公共生活中建立歸屬感。" }
      ],
      reelsTitle: "關注余浩輝的旅程",
      readFull: "閱讀全文",
      seeAllNews: "查看全部新聞",
      news: [
        { date: "2026年8月18日", title: "競選辦公室開幕", preview: "Vote 4 Yu 競選辦公室現已開放——歡迎前來領取標語牌、認識團隊或打個招呼。" },
        { date: "2026年8月2日", title: "微信答問時間開始", preview: "余浩輝現於每週三晚在競選微信群解答第二選區的問題。" },
        { date: "2026年7月15日", title: "正式報名參選第二選區", preview: "余浩輝已正式成為萬錦市第二選區市議員候選人。" }
      ]
    },

    platform: {
      heroTitleA: "",
      heroTitleB: " 政綱",
      heroBody: "對第二選區的六項承諾。每一項都設有意見渠道——告訴余浩輝它在您的街道上應該是什麼樣子——並附有持續更新的進度記錄。",
      seeProgress: "查看進度",
      planks: [
        { body: "安穩而有尊嚴的居所，是健康社區的基礎。" },
        { body: "終身學習與清晰的健康資訊，讓不同語言、不同世代的家庭都能找到並使用所需服務。" },
        { body: "您的選區，您的聲音。余浩輝直接為您發聲，讓您的需要主導決策。" },
        { body: "公園、康樂、安全，以及讓社區倍感關懷的每一項市政小修繕。" },
        { body: "以實用工具連結居民與資訊、連結彼此，不讓任何人掉隊。" },
        { body: "一個歡迎新移民與老街坊的第二選區，在公共生活中建立歸屬感。" }
      ],
      talkTitle: "與余浩輝對話",
      talkBody1: "對住房、教育、發聲、生活質量、科技或好客共融有任何關注？留言給余浩輝——他會親自閱讀，並以電郵回覆您。",
      talkBody2: "更喜歡社交平台？可在",
      talkOr: "或",
      talkEnd: "找到余浩輝。",
      fName: "姓名（選填）",
      fAddress: "地址（選填）",
      fCategory: "類別",
      fCategoryPh: "請選擇類別",
      fComments: "留言",
      fSend: "發送給余浩輝",
      errRequired: "請選擇類別並填寫留言。"
    },

    about: {
      heroTitleA: "認識 ",
      heroIntro: "健身教練、科技人、創業者。余浩輝已幫助超過6,000位萬錦居民變得更健康、更強壯，現在他要把同樣的能量帶到第二選區。",
      interviewCta: "採訪余浩輝",
      followJourneyCta: "關注余浩輝的旅程",
      storyTitle: "余浩輝的故事",
      /* Still the earlier 3-paragraph draft: the English bio was rewritten later and the Chinese
         was deliberately not machine-translated. The 4th and 5th paragraphs hide in 中文 until
         the campaign supplies the written translation. */
      storyParas: [
        "余浩輝的事業始於幫助別人變得更強——先是健身教練，其後創業，打造連結社區的工具。一路走來，他以英語、廣東話和普通話服務萬錦各地的新移民、長者和年輕家庭。",
        "這段經歷讓他明白一個簡單的道理：健康的人需要健康的社區。安全的公園、用自己語言就能找到的服務，以及一位打電話就會回應的市議員。這就是他對第二選區的承諾標準。",
        "關注余浩輝服務萬錦第二選區的旅程，告訴他您的需要。"
      ],
      storyCta: "閱讀 HEALTH 政綱",
      reelsTitle: "關注余浩輝的旅程",
      readFull: "閱讀全文",
      seeAllNews: "查看全部新聞",
      news: [
        { date: "2026年8月18日", title: "競選辦公室開幕", preview: "Vote 4 Yu 競選辦公室現已開放——歡迎前來領取標語牌、認識團隊或打個招呼。" },
        { date: "2026年8月2日", title: "微信答問時間開始", preview: "余浩輝現於每週三晚在競選微信群解答第二選區的問題。" },
        { date: "2026年7月15日", title: "正式報名參選第二選區", preview: "余浩輝已正式成為萬錦市第二選區市議員候選人。" }
      ]
    },

    events: {
      heroTitle: "與余浩輝見面",
      heroBody: "競選期間，余浩輝將現身第二選區的各個社區活動——晨跑、見面會、掃街——支持共建強健萬錦的行動。歡迎您的參與。",
      subCalendar: "訂閱活動日曆",
      interviewCta: "採訪余浩輝",
      tabEvents: "近期活動",
      tabJourney: "余浩輝的旅程",
      hostCard: "有興趣在您的商戶舉辦余浩輝的活動？",
      partnerCta: "與余浩輝合作",
      followCard: "想更貼身關注余浩輝的旅程？",
      followIg: "在 Instagram 關注余浩輝",
      rsvp: "報名",
      readFull: "閱讀全文",
      events: [
        { date: "9月12日", time: "上午9時", zh: "晨跑", title: "社區晨跑", where: "Milliken Mills 公園——歡迎任何配速" },
        { date: "9月20日", time: "下午2時", zh: "見面會", title: "第二選區見面會", where: "Aaniin 社區中心 B 室" },
        { date: "10月4日", time: "上午10時", zh: "掃街", title: "大街散步漫談", where: "Kennedy Rd 與 Denison St 交界集合" }
      ],
      articles: [
        { date: "2026年8月18日", title: "競選辦公室開幕", preview: "Vote 4 Yu 競選辦公室現已開放——歡迎前來領取標語牌、認識團隊或打個招呼。" },
        { date: "2026年8月2日", title: "微信答問時間開始", preview: "余浩輝現於每週三晚在競選微信群解答第二選區的問題。" },
        { date: "2026年7月15日", title: "正式報名參選第二選區", preview: "余浩輝已正式成為萬錦市第二選區市議員候選人。" },
        { date: "2026年6月28日", title: "200位街坊參加社區晨跑", preview: "每月一次的第二選區晨跑，從 Milliken Mills 公園出發，人數創新高。" },
        { date: "2026年6月10日", title: "HEALTH 政綱發佈", preview: "對第二選區的六項承諾——住房、教育、發聲、生活質量、科技與好客共融。" },
        { date: "2026年5月24日", title: "義工培訓日", preview: "探訪、活動與網上團隊齊聚一堂，進行全日培訓與規劃。" },
        { date: "2026年5月3日", title: "第二選區春季公園清潔", preview: "街坊與義工一個上午清潔了三個公園，並整理出交給市政府的修繕清單。" },
        { date: "2026年4月12日", title: "余浩輝做客本地電台：健康城市", preview: "一場關於健身教練生涯如何啟發他建設健康社區的對話。" }
      ]
    },

    involved: {
      heroTitleA: "與 ",
      heroTitleB: " 一起建設強健萬錦",
      heroBody: "三種支持方式：捐款、商業合作，或抽空做義工。",
      donateTitle: "Donate",
      donateBody: "競選靠的是街坊，不是財團。萬錦居民的捐款用於第二選區的標語牌、傳單和社區活動。居於萬錦並捐款$50或以上？您可向萬錦市政府申請回贈（受條件限制）。",
      donateCta: "捐款",
      partnerTitle: "Business partnership",
      partnerBody: "我們正尋找願意共建健康萬錦的商戶——贊助社區跑步、舉辦聚會，或在櫥窗擺放標語牌。",
      partnerCta: "聯絡競選團隊",
      volTitle: "Volunteer",
      volBody: "我們正尋找關心萬錦、想讓它更健康更強大的人。幾個小時就能帶來改變。",
      volCta: "報名做義工",
      mediaTitle: "Media Inquiries",
      mediaBody: "如需採訪、評論或媒體資料，請聯絡競選團隊。詳情稍後公佈。",
      mediaCta: "媒體聯絡"
    }
  }
};
