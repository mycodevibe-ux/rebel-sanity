import { Page } from "@/types/cms";
import { homePageFixture } from "./home";
import { aboutPageFixture } from "./about";
import { packagePageFixture } from "./package";
import { blogPageFixture } from "./blog";
import { contactPageFixture } from "./contact";
import { globalSettingsFixture } from "./global";

export const allPages: Record<string, Page> = {
  home: homePageFixture,
  about: aboutPageFixture,
  packages: packagePageFixture,
  blog: blogPageFixture,
  contact: contactPageFixture,
};

export {
  homePageFixture,
  aboutPageFixture,
  packagePageFixture,
  blogPageFixture,
  contactPageFixture,
  globalSettingsFixture,
};
