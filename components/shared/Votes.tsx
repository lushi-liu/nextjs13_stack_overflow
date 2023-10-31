"use client";

import React from "react";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleSave = () => {};

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        // await upvoteAnswer({
        //     questionId: JSON.parse(itemId),
        //     userId: JSON.parse(userId),
        //     hasUpvoted,
        //     hasDownvoted,
        //     path: pathname,
        //   });
      }
      return;
    }
    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        // await downvoteAnswer({
        //     questionId: JSON.parse(itemId),
        //     userId: JSON.parse(userId),
        //     hasUpvoted,
        //     hasDownvoted,
        //     path: pathname,
        //   });
      }
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <div className="flex-center gap-2.5">
          <div className="flex-center gap-1.5">
            <Image
              src={
                hasUpvoted
                  ? "/assets/icons/upvoted.svg"
                  : "/assets/icons/upvote.svg"
              }
              alt="upvote"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => handleVote("upvote")}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatNumber(upvotes)}
              </p>
            </div>
          </div>
          <div className="flex-center gap-1.5">
            <Image
              src={
                hasDownvoted
                  ? "/assets/icons/downvoted.svg"
                  : "/assets/icons/downvote.svg"
              }
              alt="downvote"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => handleVote("downvote")}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatNumber(downvotes)}
              </p>
            </div>
          </div>
        </div>
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      </div>
    </div>
  );
};

export default Votes;
