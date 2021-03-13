import styleEnv from './env.scss'

export const narrowViewportMatch = () => _matchMedia('(max-width: 878px)')

export const touchDeviceMatch = () => _matchMedia('(pointer: coarse)')

function _matchMedia (mediaQueryString) {
  if (styleEnv.mobile_support === 'false') {
    return {
      matches: false,
      media: mediaQueryString,
      addListener: () => {},
      removeListener: () => {}
    }
  }
  return window.matchMedia(mediaQueryString)
}
