import React, { useRef, useEffect } from 'react';

export default function TelegramLoginButton(props) {
	const ref = useRef(null);

  const {
      usePic = false,
      botName,
      className,
      buttonSize = 'large',
      dataOnAuth,
      authURL = false,
      cornerRadius,
      requestAccess = true,
      scriptUrl = "https://telegram.org/js/telegram-widget.js?19"
    } = props

	useEffect(() => {
    if (ref.current === null) return

    window.TelegramLoginWidget = {
      dataOnAuth: (user) => dataOnAuth(user)
    }

    const script = document.createElement('script')
    script.src = scriptUrl
    script.setAttribute('data-telegram-login', botName)
    script.setAttribute('data-size', buttonSize)

    if (cornerRadius !== undefined) {
      script.setAttribute('data-radius', cornerRadius.toString())
    }

    if (requestAccess) {
      script.setAttribute('data-request-access', 'write')
    }

    script.setAttribute('data-userpic', usePic.toString())

    if (!authURL) {
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnAuth(user)')
    } else {
      script.setAttribute('data-auth-url', authURL)
    }

    script.async = true

    ref.current.appendChild(script)
  }, [
    botName,
    buttonSize,
    cornerRadius,
    dataOnAuth,
    requestAccess,
    usePic,
    ref
  ])

	return <div ref={ref} className={className} />
}
