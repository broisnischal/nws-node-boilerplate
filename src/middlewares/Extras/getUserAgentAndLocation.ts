import uaParser from 'ua-parser-js';
import geoip from 'geoip-lite';
import NodeCache from 'node-cache';
import { NextFunction, Request } from 'express';

interface IUserDetails {
  publicIp: string;
  userAgent: string | unknown;
  parsedUserAgent: uaParser | unknown;
  userLocation: geoip.Lookup | null;
  timestamp: number;
}

interface ExtendedRequest extends Request {
  publicIp?: string;
  userAgent?: string | unknown;
  parsedUserAgent?: uaParser | unknown;
  userLocation?: geoip.Lookup | null;
}

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // 1 day

const getUserDetails = (req: Request) => {
  const userAgent = req.headers['user-agent'];
  const parsedUserAgent = uaParser(userAgent);

  const publicIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
  const ipv4 = publicIp && (publicIp.split(':').pop() as string); // Extract ipv4 from ipv6

  const cacheKey = `${ipv4}${userAgent}`;
  let userDetails = cache.get<IUserDetails>(cacheKey);

  if (!userDetails) {
    const userLocation = geoip.lookup(ipv4);
    userDetails = {
      publicIp: ipv4,
      userAgent,
      parsedUserAgent,
      userLocation,
      timestamp: Date.now(),
    };
  } else {
    userDetails.timestamp = Date.now();
    cache.set(cacheKey, userDetails);
  }

  return userDetails;
};

// eslint-disable-next-line max-len
const getUserDeviceAndLocation = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
  const userDetails = getUserDetails(req);
  req.publicIp = userDetails.publicIp;
  req.userAgent = userDetails.userAgent;
  req.parsedUserAgent = userDetails.parsedUserAgent;
  req.userLocation = userDetails.userLocation;
  next();
};

export default getUserDeviceAndLocation;
