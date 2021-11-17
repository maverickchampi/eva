import { useEffect, useState } from "react";

export function Chat() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "712fc28e-7300-4231-b5b4-dbe917c804b8", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "2dbb8222-a6e1-4334-a680-e3fdda5ca3e1", // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";

      const element = document.getElementById("chat");

      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length; i++) {
          element.removeChild(element.children[i]);
        }
      }

      document.getElementById("chat").appendChild(t);
    });
  }, []);

  return <div id="chat"></div>;
}
