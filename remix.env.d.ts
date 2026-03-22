/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type {HydrogenContext} from '@shopify/hydrogen';
import type {SessionStorage} from '@shopify/remix-oxygen';

declare module '@shopify/remix-oxygen' {
  interface AppLoadContext extends HydrogenContext {
    isDev: boolean;
    session: SessionStorage;
  }
}
