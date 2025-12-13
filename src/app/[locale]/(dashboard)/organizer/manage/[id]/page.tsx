import ManageEvent from '@/components/layout/Dashboard/Events/ManageEvent/ManageEvent';
import { GetEventById } from '@/frontend/actions/Events';
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const event = await GetEventById(params.id);
  return (
    <ManageEvent initialData={event}/>
  )
}
