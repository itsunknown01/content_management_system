import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const existingStore = await db.store.findUnique({
      where: {
          id: params.storeId,
        userId,
      }
    });

    if (!existingStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await db.billboard.delete({
        where: { id: params.billboardId }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[Billboards_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const existingStore = await db.store.findFirst({
      where: {
          id: params.storeId,
        userId,
      }
    });

    if (!existingStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboards = await db.billboard.update({
     where : { id: params.billboardId },
     data: {
        label,
        imageUrl,
      }
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[Billboards_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
