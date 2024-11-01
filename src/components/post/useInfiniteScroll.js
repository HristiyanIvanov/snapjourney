import { useCallback, useRef } from "react";

export function useInfiniteScroll(isLoading, hasMore, incrementPage) {
  const observerRef = useRef();
  const scrollPositionRef = useRef(window.scrollY);

  const lastPostRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          scrollPositionRef.current = window.scrollY;
          incrementPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, incrementPage],
  );

  return { lastPostRef, scrollPositionRef };
}
