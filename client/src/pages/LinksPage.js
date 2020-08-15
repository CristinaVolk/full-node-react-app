import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContex";
import { Loader } from "../components/Loader";
import { Links } from "../components/Links";

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();

  const getLinks = useCallback(async () => {
    try {
      const fetchedLinks = await request(`/api/link/`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetchedLinks);
    } catch (error) {}
  }, [request, token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <Links links={links} />}</>;
};

export default LinksPage;
