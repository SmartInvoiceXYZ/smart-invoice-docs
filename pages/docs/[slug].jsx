import { DocLayout, Layout } from '../../components/doc-layout/DocLayout';
// import { getPostData } from '../posts'
import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Box, Container, Heading } from '@chakra-ui/react';
import { sidebarItems } from '../../sidebars';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('docs'))
  const paths = files.map(filename => (
    {
      params: {
        slug: filename.replace('.md', '')
      }
    }
  ))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  const markdown = fs.readFileSync(path.join('docs', params.slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdown)

  const files = fs.readdirSync(path.join('docs'))
  const docs = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdown = fs.readFileSync(path.join('docs', filename), 'utf-8')
    const { data: { title } } = matter(markdown)

    return {
      slug, title
    }
  })

  const docsSorted = docs.sort((a, b) => sidebarItems.indexOf(a.slug) < sidebarItems.indexOf(b.slug) ? -1 : 1)

  return {
    props: {
      frontmatter,
      slug: params.slug,
      content,
      docs: docsSorted
    },
  };
}

export default function DocPage({ frontmatter, slug, content, docs }) {
  return (
    <DocLayout docs={docs} active={slug}>
      <Container>
        <Heading mb={8}>
          {frontmatter.title}
        </Heading>
        <Box className='doc-body' dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </Container>
    </DocLayout>
  );
}