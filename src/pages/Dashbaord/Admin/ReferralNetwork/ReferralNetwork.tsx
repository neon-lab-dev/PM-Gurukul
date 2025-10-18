import React, { useState } from "react";
import { useGetReferralNetworkQuery } from "../../../../redux/Features/Admin/adminApi";

interface UserNode {
  user: {
    _id: string;
    full_name: string;
    email: string;
    refralCode: string;
  };
  children: UserNode[];
}

// Define level colors globally so they can be used in both components
const levelColors = [
  "bg-gradient-to-r from-blue-500 to-blue-600", // Level 0
  "bg-gradient-to-r from-green-500 to-green-600", // Level 1
  "bg-gradient-to-r from-purple-500 to-purple-600", // Level 2
  "bg-gradient-to-r from-orange-500 to-orange-600", // Level 3
  "bg-gradient-to-r from-red-500 to-red-600", // Level 4
  "bg-gradient-to-r from-pink-500 to-pink-600", // Level 5+
];

const ReferralNode: React.FC<{ node: UserNode; level?: number }> = ({
  node,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const hasChildren = node.children && node.children.length > 0;
  const colorClass = levelColors[Math.min(level, levelColors.length - 1)];

  return (
    <div className="flex flex-col">
      {/* Node Card */}
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-sm border border-gray-100 my-2 transition-all duration-300 hover:shadow-md ${colorClass} text-white`}
        style={{ marginLeft: level > 0 ? `${level * 20}px` : "0" }}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
            hasChildren
              ? "bg-white/20 hover:bg-white/30 cursor-pointer"
              : "bg-transparent cursor-default"
          }`}
        >
          {hasChildren && (
            <svg
              className={`w-3 h-3 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg truncate">
              {node.user.full_name}
            </h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0">
              Level {level}
            </span>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate">{node.user.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <span className="font-mono">Code: {node.user.refralCode}</span>
            </div>
          </div>
        </div>

        {/* Referral Count Badge */}
        {hasChildren && (
          <div className="flex-shrink-0 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
            {node.children.length} referral
            {node.children.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Children Container */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300"
            style={{ left: `${level * 20 + 12}px` }}
          ></div>

          <div className="ml-5 pl-4">
            {node.children.map((child) => (
              <ReferralNode
                key={child.user._id}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ReferralNetwork: React.FC = () => {
  const { data, isLoading, isError } = useGetReferralNetworkQuery({});

  // Calculate statistics
  const calculateStats = (networkData: UserNode[]) => {
    let totalMembers = 0;
    let maxDepth = 0;
    let directRefs = 0;

    const traverse = (nodes: UserNode[], depth: number) => {
      totalMembers += nodes.length;
      maxDepth = Math.max(maxDepth, depth);

      nodes.forEach((node) => {
        directRefs += node.children ? node.children.length : 0;
        if (node.children && node.children.length > 0) {
          traverse(node.children, depth + 1);
        }
      });
    };

    traverse(networkData, 0);
    return { totalMembers, maxDepth, directRefs };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading referral network...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Failed to load network
          </h3>
          <p className="text-gray-600">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  const networkData: UserNode[] = Array.isArray(data?.network)
    ? data.network
    : [];
  const stats = calculateStats(networkData);

  if (networkData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No referral data found
          </h3>
          <p className="text-gray-600">
            Start building your referral network to see data here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Referral Network
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize your complete referral hierarchy with beautiful gradient
            cards
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalMembers}
            </div>
            <p className="text-gray-600 font-semibold">Total Members</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.maxDepth}
            </div>
            <p className="text-gray-600 font-semibold">Network Depth</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.directRefs}
            </div>
            <p className="text-gray-600 font-semibold">Direct Referrals</p>
          </div>
        </div>

        {/* Network Tree */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Network Hierarchy
              </h2>
              <p className="text-gray-600">
                Click on cards to expand/collapse branches
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {networkData.map((rootNode) => (
              <ReferralNode key={rootNode.user._id} node={rootNode} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Level Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${levelColors[level]}`}></div>
                <span className="text-sm text-gray-600">Level {level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralNetwork;
