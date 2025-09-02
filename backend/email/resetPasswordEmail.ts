// import { REMOTE_LOGO_URL } from "@/constants";

function resetPasswordEmail(otp: string, validInMin: string | number, email: string) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="background-color: #fff; color: #212121">
    <center>
      <table
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="max-width: 600px"
      >
        <tbody>
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="left">
                   <!--    <img
                        width="92"
                        height="32"
                        src="{REMOTE_LOGO_URL}"
                        style="display: block; width: 92px; height: 32px"
                        class="CToWUd"
                        data-bit="iit"
                      />  -->
                    </td>
                    <!-- <td align="right">
                      <img
                        width="32"
                        height="32"
                        style="display: block; width: 32px; height: 32px"
                        src="https://ci3.googleusercontent.com/meips/ADKq_Na4yRuuMyVoCwOxWRzLL7RD1uMFOy1kmetaN-Q6HzQ83V7iptNpf9gxtfQfTmvpoHA44ywWAzwDvPdrvdic_TnTDJZqyP14jE47RUA8=s0-d-e1-ft#https://ssl.gstatic.com/accountalerts/email/keyhole.png"
                        class="CToWUd"
                        data-bit="iit"
                      />
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr height="16"></tr>
          <tr>
            <td>
              <table
                bgcolor="#4184F3"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  min-width: 332px;
                  max-width: 600px;
                  border: 1px solid #e0e0e0;
                  border-bottom: 0;
                  border-top-left-radius: 3px;
                  border-top-right-radius: 3px;
                "
              >
                <tbody>
                  <tr>
                    <td height="72px" colspan="3"></td>
                  </tr>
                  <tr>
                    <td width="32px"></td>
                    <td
                      style="
                        font-family: Roboto-Regular, Helvetica, Arial,
                          sans-serif;
                        font-size: 24px;
                        color: #ffffff;
                        line-height: 1.25;
                      "
                    >
                      RayAuth Forgot Password Code
                    </td>
                    <td width="32px"></td>
                  </tr>
                  <tr>
                    <td height="18px" colspan="3"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table
                bgcolor="#FAFAFA"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  min-width: 332px;
                  max-width: 600px;
                  border: 1px solid #f0f0f0;
                  border-bottom: 1px solid #c0c0c0;
                  border-top: 0;
                  border-bottom-left-radius: 3px;
                  border-bottom-right-radius: 3px;
                "
              >
                <tbody>
                  <tr height="16px">
                    <td width="32px" rowspan="3"></td>
                    <td></td>
                    <td width="32px" rowspan="3"></td>
                  </tr>
                  <tr>
                    <td>
                      <span class="im"
                        ><p>Hi ${email.split("@")[0] || email},</p>
                        <p>
                          We received a request to reset the password for your
                          RayAuth account associated with this email address:
                          <span style="color: #659cef" dir="ltr"
                            ><a href="mailto:${email}" target="_blank"
                              >${email}</a
                            ></span
                          >
                          through your email address. Your RayAuth verification
                          code is:
                        </p></span
                      >
                      <div style="text-align: center">
                        <p dir="ltr">
                          <strong
                            style="
                              text-align: center;
                              font-size: 24px;
                              font-weight: bold;
                            "
                            >${otp}</strong
                          >
                        </p>
                        <p dir="ltr">
                          <span
                            style="
                              text-align: center;
                              font-size: 16px;
                              font-weight: bold;
                            "
                            >This code is valid for ${validInMin} minutes.</span
                          >
                        </p>
                      </div>
                      <span
                        ><p>
                          If you did not request this code, it is possible that
                          someone else is trying to access your RayAuth account.

                          <!-- <span style="color: #659cef" dir="ltr"
                            ><a href="mailto:${email}" target="_blank"
                              >${email}</a
                            ></span
                          >. -->
                          <strong>
                            Please do not share this code with anyone.</strong
                          >
                        </p>
                        <p>Sincerely,</p>
                        <p>The RayAuth Accounts team</p></span
                      >
                    </td>
                  </tr>
                  <tr height="32px"></tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr height="16"></tr>
          <tr>
            <td
              style="
                max-width: 600px;
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                font-size: 10px;
                color: #bcbcbc;
                line-height: 1.5;
              "
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table
                        style="
                          font-family: Roboto-Regular, Helvetica, Arial,
                            sans-serif;
                          font-size: 10px;
                          color: #666666;
                          line-height: 18px;
                          padding-bottom: 10px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td>
                              This email can't receive replies. For more
                              information, visit the
                              <a
                                href="https://support.google.com/accounts/troubleshooter/2402620?ref_topic=2364467"
                                style="text-decoration: none; color: #4d90fe"
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://support.google.com/accounts/troubleshooter/2402620?ref_topic%3D2364467&amp;source=gmail&amp;ust=1721040086786000&amp;usg=AOvVaw2jbFKRcH_JBj8Vsmr-3zSJ"
                                >RayAuth Accounts Help Center</a
                              >.<br />© Rcmade Inc
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>
`;
}
export default resetPasswordEmail;
