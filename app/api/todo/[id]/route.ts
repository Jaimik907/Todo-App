import { IIdPayload } from '@/app/utils/types';
import pool from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: IIdPayload) {
  try {
    const { id } = await params;

    const result: any = await pool.query('DELETE FROM todo WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({
        message: 'Task not found',
        success: false,
        status: 500,
      });
    }

    return NextResponse.json({
      message: 'Task deleted successfully',
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error while deleting todo' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: IIdPayload) {
  const value = await params;
  const body = await request.json();
  const { status } = body;
  try {
    const [result]: any = await pool.query(
      'UPDATE todo SET isComplete = ? WHERE id = ?',
      [status, value.id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({
        message: 'Task not found',
        success: false,
        status: 500,
      });
    }

    return NextResponse.json({
      message: 'Task status update successfully',
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching todo' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: IIdPayload) {
  const value = await params;
  const body = await request.json();
  const { task } = body;
  try {
    const [result]: any = await pool.query(
      'UPDATE todo SET task = ? WHERE id = ?',
      [task, value.id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({
        message: 'Task not found',
        success: false,
        status: 500,
      });
    }
    return NextResponse.json({
      message: 'Task updated successfully',
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching todo' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: IIdPayload) {
  const value = await params;
  try {
    const [result]: any = await pool.query(
      'SELECT task FROM todo WHERE id = ?',
      [value.id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({
        message: 'Task not found',
        success: false,
        status: 500,
      });
    }

    return NextResponse.json({
      message: 'Task status update successfully',
      success: true,
      status: 200,
      data: result[0].task
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching todo' },
      { status: 500 }
    );
  }
}
