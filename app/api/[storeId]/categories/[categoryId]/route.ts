import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await db.category.delete({
        where: { id: params.categoryId }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[Categories_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await db.category.update({
     where : { id: params.categoryId },
     data: {
        name,
        billboardId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[Billboards_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
