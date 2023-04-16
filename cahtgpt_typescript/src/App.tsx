import { useState } from "react";
import { ask } from "./ask";
import { Result } from "./util/Result";

function App() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(`submit`);
    e.preventDefault();
    const result = await ask(name);
    result.match({
      Ok: (v) => {
        setError(false);
        if (v === "true") {
          setError(true);
        }
        Result.Ok(v);
      },
      Err: (e) => Result.Err(e),
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <h1>ChatGPT Valied</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>入力間違いを指摘してくれるよ</p>
          <textarea
            rows={10}
            name="name"
            placeholder="こんにちは、私の名前はスレッタです。"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {error ? <p> 入力間違いがありますよー。</p> : <p>君は正しい</p>}
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default App;
