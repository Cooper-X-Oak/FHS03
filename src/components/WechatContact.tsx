"use client";
import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/client-events";
export function WechatContact({
  image,
  mobile,
}: {
  image: string;
  mobile: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={mobile ? "wechat-contact" : "wechat-contact desktop-only"}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          if (!open) trackEvent("wechat_qr_view");
          setOpen(!open);
        }}
      >
        WeChat
      </button>
      {open && (
        <Image
          src={image}
          alt="Scan to contact Nina on WeChat"
          width={240}
          height={240}
        />
      )}
    </div>
  );
}
