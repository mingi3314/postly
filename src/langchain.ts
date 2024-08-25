import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Reference } from "./types";

const prompt = PromptTemplate.fromTemplate(
  `<요청>
SNS 업로드를 위한 포스트를 작성해줘
- 아래에 제공할 레퍼런스 자료들을 취합해서 글을 작성해줘.
- 기존에 업로드된 게시글과 톤앤매너를 통일성 있게 유지해야 해. 기존 게시글도 제공해 줄 테니, 작성 시 참고해줘.
</요청>

<레퍼런스 자료>
{references}
</레퍼런스 자료>

<기존 글 예시>
    <예시1>
        명동에서 만난 개성파 패션의 그에게 추구미를 물어봤습니다.❤️‍🔥 그는 차별화를 추구하며 남들이 하지 않는 다양한 스타일을 시도한다고 전했는데요.💫 독보적인 개성의 소유자, 그의 최애 브랜드와 최근 구매한 아이템은 무엇일까요?💥 반다나와 슬리브리스, 초커 등 아이템을 자유자재로 믹스하는 그의 스타일링 이야기가 궁금하다면 위 영상을 확인해 보세요! 🎥 아이즈매거진
    </예시1>

    <예시2>
        글로벌 스타로 다시 돌아온 BTS(@bts.bighitofficial) 진의 영향력을 실감하는 순간.❤️‍🔥 진이 구찌(@gucci) SNS 계정 역사상 가장 많은 ’좋아요‘의 주인공이 됐습니다. 지난 8일 글로벌 앰버서더 소식을 전한 이들. 미국의 한 매체에 따르면, 일본에서는 그가 앰버서더가 되었다는 라인 알림이 공지된 즉시 공식 웹사이트 트래픽이 몰리며 다운되기도 했고, 미국 등 전 세계의 관련 토픽에서 진이 1위를 기록했다고 전했죠.📊

        현재 진의 영향력은 “소셜 미디어에 게시된 구찌의 게시물 참여율을 통해서도 확인할 수 있다”라고 덧붙였는데요. 역시 인스타그램에서도 또 한 번 역사를 새로 썼습니다.⭐️ 현재 글로벌 앰버서더로 발탁된 진을 환영하는 구찌의 첫 게시물이 352만 개 이상의 ’좋아요‘와 5만 개 이상의 댓글을 기록, 역대 구찌 게시물 중 가장 많은 ‘좋아요’와 댓글을 받은 게시물이 되었다고 하네요.😘 📸 구찌
    </예시2>

    <예시3>
        손흥민(@hm_son7)이 올 시즌 첫 멀티 골을 터뜨렸습니다.🤍 2024/25 시즌 PL(@premierleague) 2라운드 토트넘 홋스퍼(@spursofficial)와 에버튼(@everton)의 경기에서 손흥민은 리그 1, 2호 골에 성공.⚽️ 이브 비수마(@yves_bissouma)의 선제골에 이어 전반 25분, 후반 77분에 추가골을 기록했는데요.✔️ 토트넘은 크리스티안 로메로(@cutiromero2)의 득점을 포함해 4-0 대승을 거뒀죠.🙇🏻‍♂️ 한편 이날 경기 PL 통산 122번째 득점을 올린 손흥민은 로멜루 루카쿠를 제치고 PL 역대 득점 랭킹 단독 21위에 이름을 올렸습니다. 📸 @hm_son7
    </예시3>

    <예시4>
        LA 다저스(@dodgers)의 오타니 쇼헤이(@shoheiohtani)가 아시아 선수 최초이자 MLB(@mlb) 역사상 6번째 40홈런-40도루 주인공이 됐습니다.🧢 금일 오타니는 2024 MLB 탬파베이 레이스(@raysbaseball)와 홈경기에서 1번 지명타자로 선발 출장해 5타수 2안타 1도루 4타점 1득점을 기록, 끝내기 홈런을 터뜨렸고 다저스는 7-3 승리를 거뒀는데요.⚾️ 경기 후 오타니는 “매우 기쁘다. 무엇보다 마지막에 친 게 다저스에 온 이후로 가장 추억이 될 듯하다”라며 짧은 소감을 전했습니다.🗣️ 📸 @dodgers
    </예시4>

    <예시5>
        저스틴 비버(@justinbieber)와 헤일리 비버(@haileybieber)가 2세 출산 소식을 알렸습니다.🫶🏻 방금 전 저스틴 비버는 자신의 인스타그램에 ‘WELCOME HOME’, ‘JACK BLUES BIEBER’라는 문구와 함께 아기의 발 사진을 공개했는데요.🐾 아기의 탄생으로 새로운 미래를 그려나갈 이들에게 아낌없는 축하를 전합니다.✨ 📸 @justinbieber
    </예시5>
</기존 글 예시>`
);

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});

const parser = new StringOutputParser();

// 주어진 텍스트에 특정 레벨의 탭 들여쓰기를 적용하는 함수
function indentText(text: string, level: number): string {
  const indent = "\t".repeat(level); // 레벨에 따라 탭 생성
  return text
    .split("\n")
    .map((line) => indent + line)
    .join("\n");
}

// 레퍼런스 객체를 <레퍼런스 n> 포맷으로 변환하고 들여쓰기를 적용하는 함수
function formatReference(reference: Reference, index: number): string {
  const openingTag = indentText(`<레퍼런스 ${index + 1}>`, 1);
  const closingTag = indentText(`</레퍼런스 ${index + 1}>`, 1);
  const indentedText = indentText(reference.text, 2); // 내부 텍스트는 더 깊은 수준으로 들여쓰기

  return `${openingTag}\n${indentedText}\n${closingTag}`;
}

// 자동 글 생성 함수
export async function generatePost(references: Reference[]): Promise<string> {
  const formattedReferences = references
    .map((ref, index) => formatReference(ref, index))
    .join("\n\n");

  const input = {
    references: formattedReferences,
  };

  const chain = prompt.pipe(model).pipe(parser);

  // OpenAI API로 요청
  const result = await chain.invoke(input);

  return result;
}
