import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    // 记录到本地文件（简单方案）
    const fs = require("fs");
    const path = require("path");
    
    const subscribersPath = path.join(process.cwd(), "data", "subscribers.json");
    
    let subscribers: string[] = [];
    try {
      const data = fs.readFileSync(subscribersPath, "utf-8");
      subscribers = JSON.parse(data);
    } catch {
      // 文件不存在，创建新数组
      subscribers = [];
    }

    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
    }

    // 可选：发送邮件通知到 rexbuildsai@gmail.com
    // 这里用简单的日志记录，后续可以接入 Resend/SendGrid/Beehiiv
    console.log(`[SUBSCRIBE] New subscriber: ${email}`);
    console.log(`[SUBSCRIBE] Total subscribers: ${subscribers.length}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SUBSCRIBE] Error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}