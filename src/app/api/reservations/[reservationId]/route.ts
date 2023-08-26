import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../../lib/prismadb";

interface IParam {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParam }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invaild ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        {
          listing: { userId: currentUser.id },
        },
      ],
    },
  });

  return NextResponse.json(reservation);
}
