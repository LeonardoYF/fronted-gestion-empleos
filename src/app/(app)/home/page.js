
import dynamic from "next/dynamic" 

export const metadata = {
    title: 'Laravel - Home',
}
const HomeDinamic = dynamic(() => import('@/components/home/Home'), {loading: () => <p>Loading...</p>, })

export default function Home() {
    return <HomeDinamic />
  }
