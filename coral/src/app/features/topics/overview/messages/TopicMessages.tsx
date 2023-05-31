import { useQuery } from "@tanstack/react-query";
import { TableLayout } from "src/app/features/components/layouts/TableLayout";
import { TopicMessageList } from "src/app/features/topics/overview/messages/components/TopicMessageList";
import { getTopicMessages } from "src/domain/topic/topic-api";
import {
  type NoContent,
  type TopicMessages as TopicMessagesType,
} from "src/domain/topic/topic-types";
import {
  Box,
  Button,
  EmptyState,
  PageHeader,
  Typography,
} from "@aivenio/aquarium";
import { useTopicDetails } from "src/app/features/topics/details/TopicDetails";
import refreshIcon from "@aivenio/aquarium/dist/src/icons/refresh";
import { TopicMessageOffsetFilter } from "src/app/features/topics/overview/messages/components/TopicMessageOffsetFilter";
import {
  Offset,
  useOffsetFilter,
} from "src/app/features/topics/overview/messages/useOffsetFilter";

function isNoContentResult(
  result: TopicMessagesType | NoContent | undefined
): result is NoContent {
  return Boolean(result && "status" in result);
}

function TopicMessages() {
  const { topicName } = useTopicDetails();

  const [offset, setOffset] = useOffsetFilter();
  const {
    data: consumeResult,
    isError,
    isRefetching,
    isInitialLoading,
    error,
    refetch: updateResults,
    dataUpdatedAt: messagesUpdatedAt,
  } = useQuery({
    enabled: false, // No initial fetch, only fetch when refetch is called
    queryKey: ["topicMessages"],
    queryFn: () =>
      getTopicMessages({
        topicName,
        consumerGroupId: "notdefined",
        envId: "2",
        offsetId: offset,
      }),
    keepPreviousData: true,
  });

  const isConsuming = isInitialLoading || isRefetching;

  function handleUpdateResultClick(): void {
    updateResults();
  }

  function handleOffsetChange(offset: Offset): void {
    setOffset(offset);
  }

  function getMessagesUpdatedAt(): string {
    return new Intl.DateTimeFormat("UTC", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(messagesUpdatedAt);
  }

  function getTableContent() {
    if (!consumeResult) {
      return (
        <EmptyState title="Consume Messages">
          Select offset and Update results.
        </EmptyState>
      );
    } else if (isNoContentResult(consumeResult)) {
      return (
        <EmptyState title="No messages">
          This Topic contains no Messages.
        </EmptyState>
      );
    } else {
      return <TopicMessageList messages={consumeResult ?? {}} />;
    }
  }

  return (
    <>
      <PageHeader title="Messages" />
      <TableLayout
        filters={[
          <TopicMessageOffsetFilter
            key={"offset"}
            value={offset}
            disabled={isConsuming}
            onChange={handleOffsetChange}
          />,
          <Box.Flex key={"consume"} justifyContent="flex-end">
            <Box.Flex alignItems="center" marginRight={"6"}>
              {Boolean(messagesUpdatedAt) && (
                <Typography.Caption>
                  <i>Last updated {getMessagesUpdatedAt()}</i>
                </Typography.Caption>
              )}
            </Box.Flex>
            <Button.Primary
              onClick={handleUpdateResultClick}
              disabled={isConsuming}
              loading={isConsuming}
              aria-label={`Consume and display the latest ${offset} messages from topic ${topicName}`}
              icon={refreshIcon}
            >
              Update results
            </Button.Primary>
          </Box.Flex>,
        ]}
        isLoading={isConsuming}
        isErrorLoading={isError}
        errorMessage={error}
        table={getTableContent()}
      />
    </>
  );
}

export { TopicMessages };