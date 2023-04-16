import { Configuration, OpenAIApi } from "openai";
import { Result } from "./util/Result";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function ask(
  content: string,
  model = "gpt-4"
): Promise<Result<String, Error>> {
  const text = content;
  const question = `
  日本語の読解について質問があります。
  [text]を読んで、質問への答えを書いてください。
  [text]から質問に対する答えを推測できない場合は、「わかりません」と答えてください。

  [text]
  次の文章に誤字脱字があれば「true」、なければ「false」を答えてください。
  「${text}」
  `;
  try {
    const response = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: question }],
    });
    const answer = response.data.choices[0].message?.content;
    console.log(`アンサー${answer}`);
    return Result.Ok(answer);
  } catch (e) {
    return Result.Err(Error());
  }
}
