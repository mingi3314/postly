import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = PromptTemplate.fromTemplate(
  `<요청>
  SNS 업로드를 위한 포스트를 작성해주세요:
  
  1. 아래에 제공할 레퍼런스 자료들을 취합하여 글을 작성해주세요.
  2. 기존에 업로드된 게시글의 스타일과 톤을 통일성 있게 유지해야 합니다. <기존 글 예시> 태그에 있는 예시 데이터를 참고해주세요. 이모지를 사용하는 방식도 유사하게 모방해주세요.
  3. 다음의 문장 구조를 따라주세요:
     - 첫 문장: -니다 (전체 요약, 핵심)
     - 두 번째 문장: -는데요 (자세한 서두, 혹은 위 요약의 해석)
     - 세 번째 문장: -이 특징, -이죠 (보충 설명) / -니다 (보충설명) / -알린 것
     - 네 번째 문장: 
       * if 레퍼런스에 인용구가 있는 경우: "..." 라고 밝혔습니다/전했습니다/강조했습니다. (직접 인용)
       * else: -입니다/-합니다 (추가 정보나 보충 설명)
     - 다섯 번째 문장: -일 예정입니다. -에서 확인할 수 있습니다. -이는 ~만의 일입니다. (마무리, 객관적 사실)
  4. 전체 글은 4-5개의 문장으로 구성해주세요.
  5. 글의 주요 단어를 활용하여 해시태그를 만들어주세요. 순서는 #eyesmag #영어1 #영어2 ... #한글1 #한글2 입니다.
  6. 권유문(예: 초대합니다, 경험하세요 등)은 사용하지 마세요. 단, 마지막 문장에서 추가 정보 확인을 요청하는 경우는 예외입니다.
  7. 느낌표를 사용하지 마세요.
  </요청>
  
  <레퍼런스 자료>
  {references}
  </레퍼런스 자료>
  
  <기존 글 예시>
    <예시 1>
    롯데워터파크(@lottewaterpark)가 반려견과 함께할 수 있는 ’댕댕워터파크‘를 오픈합니다.🐕 매년 봄과 가을에만 만날 수 있는 ’댕댕워터파크‘는 약 1,000평 크기의 국내 최대 규모 워터파크로 자이언트 아쿠아 플렉스와 수중 놀이터 티키풀을 중심으로 운영되는데요.🌊 맹견으로 지정된 5종을 제외한 모든 견종이 입장 가능하며, 수중 20cm로 운영되어 소형견도 안심하고 이용할 수 있습니다.🐶 반려견 패션쇼와 장기자랑 대회 등 다양한 행사가 열릴 ’댕댕워터파크‘는 오는 오는 8월 29일부터 오픈하며, 9월 8일까지는 상시운영, 9월 9일부터는 주말, 공휴일, 10월 4일에만 운영됩니다. 📸 @lottewaterpark
    </예시 1>
  
    <예시 2>
    유니클로(@uniqlokr)가 롯데월드몰 내 2개 층, 무려 1천 평에 달하는 국내 최대 규모의 매장을 오픈합니다.👋🏻 이곳에서는 ‘리유니클로 스튜디오’와 ‘유티미!’와 같은 새로운 서비스를 국내 최초로 경험할 수 있는데요. 먼저 ‘리유니클로 스튜디오’는 구멍, 찢어짐, 솔기, 패치워크 등을 수선할 수 있는 서비스와 자수 패턴을 활용한 의류 커스터마이징 서비스를 제공하며, 총 800여 가지의 다양한 스티커를 활용해 나만의 티셔츠를 만들 수 있는 커스터마이징 서비스 ‘유티미!’도 준비되었습니다.✔️ 공식 오픈일은 오는 9월 13일. 직접 방문해 이곳에만 있는 특별한 서비스를 경험해 보세요. 자세한 내용은 매거진 사이트에서 확인할 수 있습니다. 📸 유니클로.
    </예시 2>
    
    <예시 3>
    디올(@dior)이 앰버서더 투모로우바이투게더(@txt_bighit)와 함께한 24 겨울 남성 컬렉션 비주얼을 공개했습니다.🤍 멤버들은 기능적이면서 서정적인 디자인으로 승화된 이번 컬렉션을 착용하여 우아한 면모를 뽐냈는데요. 재해석된 디올의 대담한 볼륨과 샤프한 컷이 멤버들과 조화롭게 어우러진 모습. 투모로우바이투게더와 함께한 디올 새 컬렉션은 전국 부티크와 공식 홈페이지에서 만나볼 수 있습니다. 📸 디올
    </예시 3>
  
    <예시 4>
    한화이글스(@hanwhaeagles_soori)가 두산베어스(@doosanbears.1982)와의 경기에서 3연전 전승을 기록, 스윕을 달성했습니다.⚾️ 무려 7020일, 19년만. 류현진(@hyunjinryu325)이 선발로 등판하여 맹활약 했고 팽팽한 투수전 끝에 3-1 승리를 기록했는데요. 이로써 올 시즌 상대 전적에서도 두산 상대 9승 6패를 기록, 우위를 확정 지었으며 이 역시 2011년 이후 13년 만의 기적 같은 일이라고 합니다.☄️ 앞으로도 이어질 한화의 활약을 기대해 보세요! 📸 @hanwhaeagles_soori
    </예시 4>
  
    <예시 5>
    서울시(@seoul_official)가 도시 브랜드 ‘서울, 마이 소울’ 출범 1주년을 맞아 바프(@hbaf_official)와 ‘서울 아몬드’를 선보입니다.🏈 K문화 중 하나인 ‘한강에서 치킨 먹기’를 모티브로, 후라이드치킨 맛, 양념치킨 맛, 간장치킨 맛 총 3가지로 구성됐는데요.🍗 제품은 내달 10일 전국 바프 오프라인 매장에서 만나볼 수 있으며, 19일부터 바프 네이버 온라인 스토어에서 판매될 예정입니다.🛒 📸 서울시
    </예시 5
  
    <예시 6>
    기름이 어떻게 자동차를 움직일까?🤔 HD현대오일뱅크(@hdhyundaioilbank.official)가 정유 업계 최초로 그 비밀을 밝힌 영상을 공개했습니다.✨ 독특한 크리에이티브로 탄탄한 팬층을 보유한 크리에이티브 에이전시 돌고래유괴단(@dolphiners_films)과 함께한 본 캠페인은 차를 움직이기 위해 고군분투하는 ‘오일전사’들의 모습을 보여주며 HD현대오일뱅크의 고객을 향한 진심을 유쾌하게 보여주는 콘셉트로 풀어냈죠.🚙 배우 유지태(@jt_db)와 김동준(@super_d.j)이 열연을 펼친 해당 영상의 풀버전은 HD현대오일뱅크 유튜브 채널 및 HD현대(@hd.hyundai) 인스타그램 채널에서 감상할 수 있습니다. 🎥 HD현대오일뱅크
    </예시 6>
  </기존 글 예시>`
);

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY, // 서버에서 환경 변수로 설정
});

const parser = new StringOutputParser();

function indentText(text: string, level: number): string {
  const indent = "\t".repeat(level);
  return text
    .split("\n")
    .map((line) => indent + line)
    .join("\n");
}

function formatReference(reference: { text: string }, index: number): string {
  const openingTag = indentText(`<레퍼런스 ${index + 1}>`, 1);
  const closingTag = indentText(`</레퍼런스 ${index + 1}>`, 1);
  const indentedText = indentText(reference.text, 2);

  return `${openingTag}\n${indentedText}\n${closingTag}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { references } = req.body;

  if (!references || !Array.isArray(references)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const formattedReferences = references
    .map((ref, index) => formatReference(ref, index))
    .join("\n\n");

  const input = {
    references: formattedReferences,
  };

  try {
    const chain = prompt.pipe(model).pipe(parser);
    const result = await chain.invoke(input);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate post" });
  }
}
