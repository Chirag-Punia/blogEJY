import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import HTMLComponent from "./HtmlComponent";
export default function Details() {
  const { idd } = useParams();
  const base_url = "https://blogejy.onrender.com";
  const [htmlCode, setHtmlCode] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const init = async () => {
    await axios.post(`${base_url}/article/data`, { ID: idd }).then((res) => {
      setHtmlCode(res.data.article[0].htmlCode);
      setImage(res.data.article[0].image);
      setTitle(res.data.article[0].title);
      setLoading(false);
    });
  };
  useEffect(() => {
    init();
  });

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {" "}
      <HTMLComponent htmlString={htmlCode} />
    </>
  );
}
