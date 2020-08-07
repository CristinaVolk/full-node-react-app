import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>The Link</h2>
      <p>
        Your link:{" "}
        <a href={link.to} target='blank' rel='noopener noreferrer'>
          {link.to}
        </a>
      </p>
      <p>
        From:{" "}
        <a href={link.from} target='blank' rel='noopener noreferrer'>
          {link.from}
        </a>
      </p>
      <p>
        Number of clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of creating:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
