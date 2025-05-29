import React from "react"
import { Card, CardFooter } from "../ui/card"
import CardHeader from "./card-header"
import SocialButtons from "./social-buttons"

interface AuthCardWrapperProps {
  children?: React.ReactNode
  className?: string
  headerLabel?: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
}

const AuthCardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial = false,
}: AuthCardWrapperProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader label={headerLabel} />
      {children}
      {showSocial && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
    </Card>
  )
}

export default AuthCardWrapper
