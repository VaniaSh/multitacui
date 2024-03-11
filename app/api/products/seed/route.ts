import data from '@/lib/data'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { users } = data
  await dbConnect()
  return NextResponse.json({
    message: 'seeded successfully',
    users,
  })
}
