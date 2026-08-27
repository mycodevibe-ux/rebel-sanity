import { destinationType } from "./destination";
import { serviceType } from "./service";
import { testimonialType } from "./testimonial";
import { blogPostType } from "./blogPost";
import { globalSettingsType } from "./globalSettings";
import { homePageType } from "./homePage";
import { aboutPageType } from "./aboutPage";
import { contactPageType } from "./contactPage";
import { packagesPageType } from "./packagesPage";
import { customPageType } from "./customPage";

export const schemaTypes = [
  // Global
  globalSettingsType,

  // Pages
  homePageType,
  aboutPageType,
  packagesPageType,
  contactPageType,
  customPageType,

  // Collections
  destinationType,
  serviceType,
  testimonialType,
  blogPostType,
];
