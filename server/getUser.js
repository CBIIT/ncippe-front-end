const axios = require("axios");
module.exports = async (req, res, next) => {
  if (req.path.startsWith("/userLists")) {
    const _send = res.send;

    res.send = async function (body) {
      try {
        if (Object.keys(req.query)[0] !== "_embed") {
    
          const json = typeof body === 'string' ? JSON.parse(body) : body;
          const flatArray = Object.keys(json).reduce((arr, key) => {
            if (Array.isArray(json[key])) {
              return arr.concat(...json[key]);
            }
            return arr;
          }, []);
          const match = flatArray.find(
            (elem) =>
              elem[Object.keys(req.query)[0]] === Object.values(req.query)[0]
          );
          return _send.call(this, JSON.stringify(match));
        }
      } catch (e) {
        console.error("Failed to process /userLists middleware:", e);
      }
      
      return _send.call(this, body);
    };
    next();
  } 
    else if (req.path === "/users") {
    const _query = req.query;

    // console.log("query",_query)
    try {
      const response = await axios.get("http://localhost:5000/userLists/1", {
        params: {
          ..._query,
          _embed: [
            "patients",
            "providers",
            "crcs",
            "bsscs",
            "mochaAdmins",
            "admins",
            "messengers",
          ],
        },
      });

      const user = response.data;

      // if there was a query then return single user
      if (Object.keys(_query).length && user) {
        let userType = "";
        let _embed = [];
        let _expand = [];
        if (user.userType) {
          switch (user.userType) {
            case "PPE_PARTICIPANT":
              userType = "patients";
              _embed = [
                "reports",
                "notifications",
                "questionAnswers",
                "otherDocuments",
              ];
              if (user.providerId) {
                _expand.push("provider");
              }
              if (user.crcId) {
                _expand.push("crc");
              }
              break;
            case "PPE_PROVIDER":
              userType = "providers";
              _embed = ["patients", "notifications"];
              if (user.crcId) {
                _expand.push("crc");
              }
              break;
            case "PPE_CRC":
              userType = "crcs";
              _embed = ["patients", "providers", "notifications"];
              break;
            case "PPE_BSSC":
              userType = "bsscs";
              _embed = ["notifications"];
              break;
            case "PPE_MOCHA_ADMIN":
              userType = "mochaAdmins";
              break;
            case "PPE_ADMIN":
              userType = "admins";
              _embed = ["notifications"];
              break;
            case "PPE_MESSENGER":
              userType = "messengers";
              break;
            default:
              userType = "patients";
              _embed = ["notifications"];
              if (user.providerId) {
                _expand.push("provider");
              }
              if (user.crcId) {
                _expand.push("crc");
              }
          }

          req.url = `/${userType}/${user.id}`;
          req.query = {
            _embed,
            _expand,
          };
        }
      }

      // if there was no query then send back all users
      else {
        const _send = res.send;
        res.send = function () {
          return _send.call(this, user);
        };
      }

      next();
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).send({ error: "Internal middleware error." });
    }
  } else {
    next();
  }
};
