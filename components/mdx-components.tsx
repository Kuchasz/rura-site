import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import FacebookVideo from './facebook-video'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default <a> element with Next.js Link
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('http') || href?.startsWith('//')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }
      return (
        <Link href={href || '#'} {...props}>
          {children}
        </Link>
      )
    },
    // Override the default <img> element with Next.js Image
    img: ({ src, alt, ...props }) => {
      if (typeof src === 'string') {
        return (
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={400}
            className="rounded-xl"
            {...props}
          />
        )
      }
      return <img src={src} alt={alt} {...props} />
    },
    // Custom styling for iframes (YouTube videos, etc.)
    iframe: ({ src, title, ...props }) => (
      <div className="my-6">
        <iframe
          src={src}
          title={title}
          className="w-full rounded-xl"
          {...props}
        />
      </div>
    ),
    // Custom styling for lists
    ul: ({ children, ...props }) => (
      <ul className="ml-4 list-disc space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="ml-4 list-decimal space-y-2" {...props}>
        {children}
      </ol>
    ),
    // Custom styling for headings
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-6" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-5" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4" {...props}>
        {children}
      </h4>
    ),
    // Custom styling for paragraphs
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    // Custom styling for blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote className="my-4 border-l-4 border-orange-600 pl-4 italic" {...props}>
        {children}
      </blockquote>
    ),
    // Custom styling for code blocks
    code: ({ children, ...props }) => (
      <code className="rounded bg-stone-100 px-2 py-1 text-sm" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="my-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-white" {...props}>
        {children}
      </pre>
    ),
    // Custom styling for strong elements
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
    // Custom styling for emphasis
    em: ({ children, ...props }) => (
      <em className="italic text-gray-700" {...props}>
        {children}
      </em>
    ),
    // Custom styling for horizontal rules
    hr: ({ ...props }) => (
      <hr className="my-8 border-stone-200" {...props} />
    ),
    // Custom Facebook video component
    FacebookVideo,
    ...components,
  }
}
