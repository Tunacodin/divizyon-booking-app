import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-posta adresi gerekli." },
        { status: 400 },
      );
    }

    const token = process.env.CIRCLE_API_TOKEN;
    if (!token) {
      console.error("CIRCLE_API_TOKEN is not set");
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası." },
        { status: 500 },
      );
    }

    const url = `https://app.circle.so/api/admin/v2/community_members/search?email=${encodeURIComponent(email)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (res.status === 404) {
      // Member not found
      return NextResponse.json({ isMember: false });
    }

    if (!res.ok) {
      console.error("Circle API error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Üyelik doğrulama servisi şu an kullanılamıyor." },
        { status: 502 },
      );
    }

    const data = await res.json();

    // v2 search returns a single member object if found
    const isMember = data && typeof data === "object" && !!data.id;

    return NextResponse.json({ isMember });
  } catch (error) {
    console.error("Circle check error:", error);
    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 },
    );
  }
}
