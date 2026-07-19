import { Arrival } from '@/features/home/Arrival'
import { EcosystemStrip } from '@/features/home/EcosystemStrip'
import { Manifesto } from '@/features/home/Manifesto'
import { Campaign } from '@/features/home/Campaign'
import { Craft } from '@/features/home/Craft'
import { Presence } from '@/features/home/Presence'
import { JournalPreview } from '@/features/home/JournalPreview'

export default function Home() {
  return (
    <main id="main">
      <Arrival />
      <EcosystemStrip />
      <Manifesto />
      <Campaign />
      <Craft />
      <Presence />
      <JournalPreview />
    </main>
  )
}
