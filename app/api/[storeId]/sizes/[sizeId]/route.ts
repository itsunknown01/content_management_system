import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; sizeId: string };
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await db.size.delete({
        where: { id: params.sizeId }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Categories_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await db.size.update({
     where : { id: params.sizeId },
     data: {
        name,
        value,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Billboards_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
