import { Class } from "@/entity/School/model";
import { UserIdentity } from "@/entity/User/model";
import { WithFio } from "@/shared/types";

export type BaseAnnouncement = {
  id: number;
  name: string;
  content?: string;
  creator: UserIdentity;
  createDate: Date;
  views: number;
  classes: Class[];
};

export type Announcement = BaseAnnouncement & {
  creator: WithFio<BaseAnnouncement["creator"]>;
};
