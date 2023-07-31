"use client"

import { Track } from "@/types"

export default function TrackCard(track: Track) {
  return (
    <li key={track.name} className="flex items-center">
      <h3>
        {track.name} by {track.artist}
      </h3>
      <h3>{track.album}</h3>
    </li>
  )
}
