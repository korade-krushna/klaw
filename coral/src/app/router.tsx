import { createBrowserRouter, RouteObject } from "react-router-dom";
import { TopicOverview } from "src/app/features/topics/details/overview";
import TopicSubscriptions from "src/app/features/topics/details/subscriptions/TopicSubscriptions";
import Layout from "src/app/layout/Layout";
import LayoutWithoutNav from "src/app/layout/LayoutWithoutNav";
import ApprovalsPage from "src/app/pages/approvals";
import AclApprovalsPage from "src/app/pages/approvals/acls";
import ConnectorApprovalsPage from "src/app/pages/approvals/connectors";
import SchemaApprovalsPage from "src/app/pages/approvals/schemas";
import TopicApprovalsPage from "src/app/pages/approvals/topics";
import ConnectorsPage from "src/app/pages/connectors";
import RequestConnector from "src/app/pages/connectors/request";
import NotFound from "src/app/pages/not-found";
import RequestsPage from "src/app/pages/requests";
import AclRequestsPage from "src/app/pages/requests/acls";
import ConnectorRequestsPage from "src/app/pages/requests/connectors";
import SchemaRequestsPage from "src/app/pages/requests/schemas";
import TopicRequestsPage from "src/app/pages/requests/topics";
import Topics from "src/app/pages/topics";
import AclRequest from "src/app/pages/topics/acl-request";
import { TopicDetailsPage } from "src/app/pages/topics/details";
import RequestTopic from "src/app/pages/topics/request";
import SchemaRequest from "src/app/pages/topics/schema-request";
import {
  APPROVALS_TAB_ID_INTO_PATH,
  ApprovalsTabEnum,
  REQUESTS_TAB_ID_INTO_PATH,
  RequestsTabEnum,
  Routes,
  TOPIC_OVERVIEW_TAB_ID_INTO_PATH,
  TopicOverviewTabEnum,
} from "src/app/router_utils";
import { getRouterBasename } from "src/config";
import { createRouteBehindFeatureFlag } from "src/services/feature-flags/route-utils";
import { FeatureFlag } from "src/services/feature-flags/types";

const routes: Array<RouteObject> = [
  // Login is currently the responsibility of the
  // Angular Klaw app
  // {
  //   path: "/login",
  // },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: Routes.TOPICS,
        element: <Topics />,
      },
      createRouteBehindFeatureFlag({
        path: Routes.TOPIC_OVERVIEW,
        element: <TopicDetailsPage />,
        featureFlag: FeatureFlag.FEATURE_FLAG_TOPIC_OVERVIEW,
        redirectRouteWithoutFeatureFlag: Routes.TOPICS,
        children: [
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[
              TopicOverviewTabEnum.OVERVIEW
            ],
            element: <TopicOverview />,
            id: TopicOverviewTabEnum.OVERVIEW,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[TopicOverviewTabEnum.ACLS],
            element: <TopicSubscriptions />,
            id: TopicOverviewTabEnum.ACLS,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[
              TopicOverviewTabEnum.MESSAGES
            ],
            element: <div>MESSAGES</div>,
            id: TopicOverviewTabEnum.MESSAGES,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[TopicOverviewTabEnum.SCHEMA],
            element: <div>SCHEMA</div>,
            id: TopicOverviewTabEnum.SCHEMA,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[
              TopicOverviewTabEnum.DOCUMENTATION
            ],
            element: <div>DOCUMENTATION</div>,
            id: TopicOverviewTabEnum.DOCUMENTATION,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[TopicOverviewTabEnum.HISTORY],
            element: <div>HISTORY</div>,
            id: TopicOverviewTabEnum.HISTORY,
          },
          {
            path: TOPIC_OVERVIEW_TAB_ID_INTO_PATH[
              TopicOverviewTabEnum.SETTINGS
            ],
            element: <div>SETTINGS</div>,
            id: TopicOverviewTabEnum.SETTINGS,
          },
        ],
      }),
      {
        path: Routes.CONNECTORS,
        element: <ConnectorsPage />,
      },
      {
        path: Routes.REQUESTS,
        element: <RequestsPage />,
        children: [
          {
            path: REQUESTS_TAB_ID_INTO_PATH[RequestsTabEnum.TOPICS],
            element: <TopicRequestsPage />,
            id: RequestsTabEnum.TOPICS,
          },
          {
            path: REQUESTS_TAB_ID_INTO_PATH[RequestsTabEnum.ACLS],
            element: <AclRequestsPage />,
            id: RequestsTabEnum.ACLS,
          },
          {
            path: REQUESTS_TAB_ID_INTO_PATH[RequestsTabEnum.SCHEMAS],
            element: <SchemaRequestsPage />,
            id: RequestsTabEnum.SCHEMAS,
          },
          {
            path: REQUESTS_TAB_ID_INTO_PATH[RequestsTabEnum.CONNECTORS],
            element: <ConnectorRequestsPage />,
            id: RequestsTabEnum.CONNECTORS,
          },
        ],
      },
      {
        path: Routes.APPROVALS,
        element: <ApprovalsPage />,
        children: [
          {
            path: APPROVALS_TAB_ID_INTO_PATH[ApprovalsTabEnum.TOPICS],
            element: <TopicApprovalsPage />,
            id: ApprovalsTabEnum.TOPICS,
          },
          {
            path: APPROVALS_TAB_ID_INTO_PATH[ApprovalsTabEnum.ACLS],
            element: <AclApprovalsPage />,
            id: ApprovalsTabEnum.ACLS,
          },
          {
            path: APPROVALS_TAB_ID_INTO_PATH[ApprovalsTabEnum.SCHEMAS],
            element: <SchemaApprovalsPage />,
            id: ApprovalsTabEnum.SCHEMAS,
          },
          {
            path: APPROVALS_TAB_ID_INTO_PATH[ApprovalsTabEnum.CONNECTORS],
            element: <ConnectorApprovalsPage />,
            id: ApprovalsTabEnum.CONNECTORS,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <LayoutWithoutNav />,
    children: [
      {
        path: Routes.ACL_REQUEST,
        element: <AclRequest />,
      },
      {
        path: Routes.SCHEMA_REQUEST,
        element: <SchemaRequest />,
      },
      {
        path: Routes.CONNECTOR_REQUEST,
        element: <RequestConnector />,
      },
      {
        path: Routes.TOPIC_REQUEST,
        element: <RequestTopic />,
      },

      {
        path: Routes.TOPIC_ACL_REQUEST,
        element: <AclRequest />,
      },
      {
        path: Routes.TOPIC_SCHEMA_REQUEST,
        element: <SchemaRequest />,
      },
    ],
  },
  {
    path: "*",
    element: <Layout />,
    children: [{ path: "*", element: <NotFound /> }],
  },
];

const router = createBrowserRouter(routes, {
  basename: getRouterBasename(),
});

export default router;
