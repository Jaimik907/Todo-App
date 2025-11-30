import pool from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [tasks] = await pool.query('SELECT * from todo');
    return NextResponse.json(
      {
        message: 'Todos fetched successfully',
        success: true,
        status: 200,
        data: { tasks },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching todo' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { task } = body;

    const [result]: any = await pool.query(
      'INSERT INTO todo (task, isComplete) VALUES (?, ?)',
      [task, false]
    );

    return NextResponse.json({
      message: 'Todo added successfully.',
      success: true,
      status: 200,
      data: { id: result.insertId, task, isComplete: false },
    });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json(
      {
        message: 'Error while adding todo',
      },
      { status: 500 }
    );
  }
}
