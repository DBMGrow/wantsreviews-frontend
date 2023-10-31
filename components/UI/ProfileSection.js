import { Avatar } from "@nextui-org/react"

export default function ProfileSection({ ...data }) {
  const avatarProps = {
    src: data.userImage,
    className: "w-20 h-20 text-large mb-1",
    color: "primary",
  }

  return (
    <div className="flex flex-col items-center text-text">
      <Avatar {...avatarProps} />
      <p className="font-bold">{data.userName}</p>
      <p className="text-sm text-text-secondary font-medium">Real Estate Agent</p>
    </div>
  )
}
