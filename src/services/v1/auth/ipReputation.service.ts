/* eslint-disable class-methods-use-this */
import IpReputation, { IIpReputation } from '@/models/v1/auth/IpReputation';
import { MongooseId } from '@/types/index.types';
import { UpdateQuery } from 'mongoose';

class IpReputationService {
  async getIpReputation(userId: MongooseId, ipAddress: string): Promise<IIpReputation | null> {
    return IpReputation.findOne({ userId, ipAddress });
  }

  async createIpReputation(userId: MongooseId, ipAddress: string): Promise<IIpReputation> {
    return IpReputation.create({ userId, ipAddress });
  }

  async updateIpReputation(
    userId: MongooseId,
    ipAddress: string,
    update: UpdateQuery<IIpReputation>,
  ): Promise<IIpReputation | null> {
    return IpReputation.findOneAndUpdate({ userId, ipAddress }, update, { new: true });
  }

  async incrementStrikes(userId: MongooseId, ipAddress: string): Promise<IIpReputation | null> {
    return this.updateIpReputation(userId, ipAddress, { $inc: { strikes: 1 } });
  }

  async updateLastWarningTime(userId: MongooseId, ipAddress: string, warningTime: Date): Promise<IIpReputation | null> {
    return this.updateIpReputation(userId, ipAddress, { lastWarningTime: warningTime });
  }

  async updateReputationScore(
    userId: MongooseId,
    ipAddress: string,
    reputationScore: number,
  ): Promise<IIpReputation | null> {
    return this.updateIpReputation(userId, ipAddress, { reputationScore });
  }

  async incrementRequests(userId: MongooseId, ipAddress: string): Promise<IIpReputation | null> {
    return this.updateIpReputation(userId, ipAddress, { $inc: { last15MinutesRequests: 1 } });
  }
}

export default new IpReputationService();
