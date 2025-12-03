import { injectable } from "tsyringe";
import { IEvent, IUser, UserModel } from "../user/user.model";
import { DBInstance } from "@/backend/config/dbConnect";
import mongoose from "mongoose";

export interface IEventRepository {
  getEvents(): Promise<IEvent[]>;
  getEvent(id: string, eventId: string): Promise<IEvent>;
  createEvent(id: string, data: IEvent): Promise<IEvent>;
  updateEvent(id: string, data: Partial<IEvent>): Promise<IEvent>;
  deleteEvent(id: string, eventId: string): Promise<IEvent>;
}

@injectable()
class EventRepository {
  async getEvents() {
    await DBInstance.getConnection();
    return await UserModel.find({}).select("events").lean().exec();
  }

  async getEvent(id: string, eventId: string): Promise<IEvent> {
    await DBInstance.getConnection();
    const data = await UserModel.findOne(
      { _id: id },
      {
        events: {
          $elemMatch: { _id: eventId },
        },
      }
    )
      .lean<Pick<IUser, "events">>()
      .exec();

    return data as IEvent;
  }

  async createEvent(id: string, data: IEvent): Promise<any> {
    await DBInstance.getConnection();
    const newEventId = new mongoose.Types.ObjectId();
    const newEvent = {
      ...data,
      _id: newEventId,
    } as IEvent;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { events: newEvent } },
      {
        new: true,
        select: {
          events: { $elemMatch: { _id: newEventId } },
        },
      }
    )
      .lean()
      .exec();

    if (!updatedUser) {
      throw new Error(`User ${id} not found or event creation failed.`);
    }

    return updatedUser;
  }

  async updateEvent(id: string, data: Partial<IEvent>): Promise<any> {
    await DBInstance.getConnection();
    // TODO: Implement the update logic
    const user = await UserModel.findById({ _id: id })
      .select("events _id")
      .lean()
      .exec();
    return user;
  }

  async deleteEvent(id: string, eventId: string): Promise<IEvent> {
    await DBInstance.getConnection();
    const eventProjection = await UserModel.findOne(
      { _id: id },
      { events: { $elemMatch: { _id: eventId } } }
    )
      .lean<Pick<IUser, "events">>()
      .exec();

    if (
      !eventProjection ||
      !eventProjection.events ||
      eventProjection.events.length === 0
    ) {
      throw new Error(`Event with ID ${eventId} not found for user ${id}.`);
    }

    const deletedEvent: IEvent = eventProjection.events[0] as IEvent;

    await UserModel.updateOne(
      { _id: id },
      {
        $pull: { events: { _id: eventId } },
      }
    ).exec();

    return deletedEvent;
  }
}

export default EventRepository;
