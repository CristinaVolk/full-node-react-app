import React, { useState, useContext, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContex";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export default function DetailPage() {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState();
  const linkId = useParams().id;
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    const fetched = await request(`/api/link/${linkId}`, "GET", null);
    setLink(fetched);
  }, [request, token, linkId]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>;
}
