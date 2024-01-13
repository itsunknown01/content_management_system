import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; colorId: string };
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const color = await db.color.delete({
        where: { id: params.colorId }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[Colors_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const color = await db.color.update({
     where : { id: params.colorId },
     data: {
        name,
        value,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[Colors_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
