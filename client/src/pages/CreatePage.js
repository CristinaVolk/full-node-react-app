import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContex";

export default function CreatePage() {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request("/api/link/generate", "POST", {
          from: link,
        });
        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: "2rem" }}>
        <div className='input-field'>
          <input
            placeholder='Paste the link'
            id='link'
            type='text'
            onChange={(event) => setLink(event.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Enter the link</label>
        </div>
      </div>
    </div>
  );
}
