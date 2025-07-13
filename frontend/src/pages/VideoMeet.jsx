import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Badge, IconButton, TextField } from "@mui/material";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import server from "../environment";

const server_url = server;

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoref = useRef();
  const videoRef = useRef([]);
  const chatContainerRef = useRef(null);

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);
  let [video, setVideo] = useState([]);
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModal, setModal] = useState(false);
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");
  let [videos, setVideos] = useState([]);

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  let getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio]);

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setVideo(false);
          setAudio(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          for (let id in connections) {
            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id,
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        })
    );
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  let getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          getUserMedia();
        })
    );
  };

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);
      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections
          );
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          connections[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find(
              (video) => video.socketId === socketListId
            );

            if (videoExists) {
              setVideos((videos) => {
                const updatedVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };

              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let handleVideo = () => {
    setVideo(!video);
  };

  let handleAudio = () => {
    setAudio(!audio);
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDislayMedia();
    }
  }, [screen]);

  let handleScreen = () => {
    setScreen(!screen);
  };

  let handleEndCall = () => {
    try {
      let tracks = localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  let openChat = () => {
    setModal(true);
    setNewMessages(0);
  };

  let closeChat = () => {
    setModal(false);
  };

  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data },
    ]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  let sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current.emit("chat-message", message, username);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  let connect = () => {
    if (username.trim() !== "") {
      setAskForUsername(false);
      getMedia();
    }
  };

  return (
    <div className={styles.container}>
      {askForUsername ? (
        <div className={styles.lobbyContainer}>
          <div className={styles.lobbyCard}>
            <div className={styles.lobbyHeader}>
              <h1>Welcome to VideoMeet</h1>
              <p>Enter your name to join the conference</p>
            </div>

            <div className={styles.usernameInput}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && connect()}
                InputProps={{
                  startAdornment: (
                    <PersonIcon style={{ marginRight: "10px" }} />
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={connect}
                className={styles.connectButton}
              >
                Join Meeting
              </Button>
            </div>

            <div className={styles.previewContainer}>
              <video
                ref={localVideoref}
                autoPlay
                muted
                className={styles.previewVideo}
              ></video>
              <div className={styles.previewOverlay}>
                <p>Preview</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.meetContainer}>
          <div
            className={`${styles.chatRoom} ${showModal ? styles.chatOpen : ""}`}
          >
            <div className={styles.chatHeader}>
              <h3>Meeting Chat</h3>
              <IconButton onClick={closeChat} className={styles.closeButton}>
                <CloseIcon />
              </IconButton>
            </div>

            <div ref={chatContainerRef} className={styles.chattingDisplay}>
              {messages.length > 0 ? (
                messages.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      item.sender === username ? styles.ownMessage : ""
                    }`}
                  >
                    <div className={styles.messageSender}>
                      {item.sender === username ? "You" : item.sender}
                    </div>
                    <div className={styles.messageContent}>{item.data}</div>
                  </div>
                ))
              ) : (
                <div className={styles.noMessages}>
                  <ChatIcon style={{ fontSize: "48px", color: "#e0e0e0" }} />
                  <p>No messages yet</p>
                  <p>Send a message to start the conversation</p>
                </div>
              )}
            </div>

            <div className={styles.chattingArea}>
              <TextField
                fullWidth
                value={message}
                onChange={handleMessage}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                Send
              </Button>
            </div>
          </div>

          <div className={styles.videoGrid}>
            <div className={styles.localVideoContainer}>
              <video
                ref={localVideoref}
                autoPlay
                muted
                className={styles.localVideo}
              ></video>
              <div className={styles.localVideoLabel}>
                <div className={styles.userBadge}>{username} (You)</div>
                {!video && (
                  <div className={styles.videoOffIndicator}>
                    <VideocamOffIcon />
                  </div>
                )}
                {!audio && (
                  <div className={styles.audioOffIndicator}>
                    <MicOffIcon />
                  </div>
                )}
              </div>
            </div>

            {videos.map((video) => (
              <div key={video.socketId} className={styles.remoteVideoContainer}>
                <video
                  data-socket={video.socketId}
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                  className={styles.remoteVideo}
                ></video>
                <div className={styles.remoteVideoLabel}>
                  <div className={styles.userBadge}>Participant</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controlsContainer}>
            <div className={styles.controlButton}>
              <IconButton
                onClick={handleVideo}
                className={`${
                  video ? styles.activeControl : styles.inactiveControl
                }`}
              >
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
              <span>Camera {video ? "On" : "Off"}</span>
            </div>

            <div className={styles.controlButton}>
              <IconButton
                onClick={handleAudio}
                className={`${
                  audio ? styles.activeControl : styles.inactiveControl
                }`}
              >
                {audio ? <MicIcon /> : <MicOffIcon />}
              </IconButton>
              <span>Mic {audio ? "On" : "Off"}</span>
            </div>

            {screenAvailable && (
              <div className={styles.controlButton}>
                <IconButton
                  onClick={handleScreen}
                  className={`${
                    screen ? styles.activeControl : styles.inactiveControl
                  }`}
                >
                  {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                </IconButton>
                <span>{screen ? "Stop Share" : "Share Screen"}</span>
              </div>
            )}

            <div className={styles.controlButton}>
              <Badge badgeContent={newMessages} max={99} color="error">
                <IconButton
                  onClick={() => setModal(!showModal)}
                  className={`${
                    showModal ? styles.activeControl : styles.inactiveControl
                  }`}
                >
                  <ChatIcon />
                </IconButton>
              </Badge>
              <span>Chat</span>
            </div>

            <div className={styles.endCallButton}>
              <IconButton
                onClick={handleEndCall}
                className={styles.endCallIcon}
              >
                <CallEndIcon />
              </IconButton>
              <span>End Call</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
