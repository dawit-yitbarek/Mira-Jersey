import React from "react";


export function ShowPreviewSkeleton({ loop }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(loop)].map((_, index) => (
        <div className="animate-pulse space-y-4" key={index}>
          <div className="bg-[#1B263B] rounded-xl h-50 w-full shimmer-box"></div>
          <div className="h-4 bg-[#1B263B] rounded w-3/4 shimmer-box"></div>
          <div className="h-4 bg-[#1B263B] rounded w-1/2 shimmer-box"></div>
        </div>
      ))}
    </div>
  );
};


export function TestimonialsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto text-center">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-[#1B263B] p-6 rounded-xl shadow space-y-4"
          >
            <div className="h-6 w-6 bg-[#90E0EF]/30 rounded shimmer-box" />
            <div className="h-4 bg-[#E0E1DD]/10 rounded w-full shimmer-box" />
            <div className="h-4 bg-[#E0E1DD]/10 rounded w-2/3 shimmer-box" />
            <div className="h-4 bg-[#E0E1DD]/10 rounded w-1/3 shimmer-box" />
          </div>
        ))}
      </div>

      <div className="mt-10 animate-pulse">
        <div className="h-10 w-40 mx-auto bg-[#90E0EF]/30 rounded-full shimmer-box" />
      </div>
    </div>
  );
};


export function CartSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#1B263B] rounded-xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="w-24 h-24 bg-[#2C3E50] rounded-md shimmer-box"/>
          <div className="flex-1 mt-4 sm:mt-0 space-y-2">
            <div className="h-5 w-1/3 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/5 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/6 bg-[#2C3E50] rounded shimmer-box" />
            <div className="flex gap-2 mt-3">
              <div className="h-5 w-8 bg-[#2C3E50] rounded-md shimmer-box" />
              <div className="h-5 w-10 bg-[#2C3E50] rounded-md shimmer-box" />
              <div className="h-5 w-8 bg-[#2C3E50] rounded-md shimmer-box" />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center">
            <div className="h-6 w-6 bg-[#2C3E50] rounded shimmer-box" />
          </div>
        </div>
      ))}

      <div className="h-6 w-32 bg-[#2C3E50] mx-auto rounded mt-8 shimmer-box" />
      <div className="h-10 w-48 bg-[#2C3E50] mx-auto rounded mt-6 shimmer-box" />
    </div>
  );
};


export function CheckoutSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse space-y-8">
      {/* Customer Info Skeleton */}
      <div className="bg-[#1B263B] p-6 rounded-lg space-y-4">
        <div className="h-6 w-1/3 bg-[#2C3E50] rounded shimmer-box" />
        <div className="h-10 w-full bg-[#2C3E50] rounded shimmer-box" />
        <div className="h-10 w-full bg-[#2C3E50] rounded shimmer-box" />
        <div className="h-24 w-full bg-[#2C3E50] rounded shimmer-box" />
      </div>

      {/* Order Summary Skeleton */}
      <div className="bg-[#1B263B] p-6 rounded-lg space-y-3">
        <div className="h-6 w-1/3 bg-[#2C3E50]  shimmer-box" />
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex justify-between">
            <div className="h-4 w-1/2 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-16 bg-[#2C3E50] rounded shimmer-box" />
          </div>
        ))}
        <div className="h-6 w-24 bg-[#2C3E50] ml-auto mt-4 rounded shimmer-box" />
      </div>

      {/* Button Skeleton */}
      <div className="mx-auto w-48 h-10 bg-[#2C3E50] rounded shimmer-box" />
    </div>
  );
};


export function EditProductsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#1B263B] rounded-xl p-4 flex flex-col sm:flex-row gap-4 space-y-4"
        >
          {/* Image placeholder */}
          <div className="w-24 h-24 bg-[#2C3E50] rounded-lg shimmer-box" />

          {/* Text lines */}
          <div className="flex-1">
            <div className="h-4 my-2 bg-[#2C3E50] w-3/4 rounded shimmer-box" />
            <div className="h-4 my-2 bg-[#2C3E50] w-1/2 rounded shimmer-box" />
            <div className="h-4 my-2 bg-[#2C3E50] w-1/3 rounded shimmer-box" />
          </div>

          {/* Button placeholder */}
          <div className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto flex justify-center md:justify-end">
            <div className="h-10 w-24 bg-[#2C3E50] rounded-md mt-2 shimmer-box" />
          </div>
        </div>
      ))}
    </div>
  );
};


export function OrdersSkeleton({pending}) {
  return (
    <div className="space-y-8 animate-pulse">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#1B263B] p-4 rounded-2xl border border-[#132A3A] space-y-4"
        >
          {/* Customer Info */}
          <div className="space-y-2">
            <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            {/* <div className="h-4 w-1/4 bg-[#2C3E50] rounded shimmer-box" />
            <div className="h-4 w-2/4 bg-[#2C3E50] rounded shimmer-box" /> */}
          </div>

          {/* Ordered Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2].map((i) => (
              <div
                key={i}
                className="flex gap-4 bg-[#132A3A] p-4 rounded-xl border border-[#90E0EF]/20"
              >
                <div className="w-20 h-20 bg-[#2C3E50] rounded-lg shimmer-box" />
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <div className="h-4 w-3/4 bg-[#2C3E50] rounded shimmer-box" />
                  <div className="h-3 w-1/2 bg-[#2C3E50] rounded shimmer-box" />
                  <div className="h-3 w-1/3 bg-[#2C3E50] rounded shimmer-box" />
                  <div className="h-3 w-2/3 bg-[#2C3E50] rounded shimmer-box" />
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Button Placeholder */}
          {pending && <div className="w-32 h-10 bg-[#2C3E50] rounded-md ml-auto mt-4 shimmer-box" />}
        </div>
      ))}
    </div>
  );
}