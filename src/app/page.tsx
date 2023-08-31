import AssNewsLatter from '@/components/my/AssNewsLatter'
import HomePosts from '@/components/my/HomePosts'
import LastPost from '@/components/my/LastPost'

export default function Home() {
  return (
    <main>
      <LastPost />
      <AssNewsLatter />
      <HomePosts />
    </main>
  )
}
