import { Avatar } from "@material-ui/core";
import React, { useEffect, useState, initialState } from "react";
import styles from "./Feed.module.css";
import Button from "@material-ui/core/Button";
import userService from "../../../services/userService";
import { useHistory } from "react-router";
function Feed({ user }) {
  const history = useHistory();
  const [companies, setCompanies] = useState(initialState);
  const [recommnededCompanies, setRecommendedCompanies] = useState(
    initialState
  );
  const [students, setStudents] = useState(initialState);
  const [recommendedStudents, setRecommendedStudents] = useState(initialState);
  useEffect(() => {
    async function getAllCompanies() {
      await userService.getAllCompanies().then((response) => {
        setCompanies(response?.data);
        setRecommendedCompanies(
          response?.data?.filter(
            (company) =>
              company.enabled &&
              company?.company?.aboutCompany?.domaine ==
              user?.cv?.about?.domaine
          )
        );
      });
    }
    async function getAllStudents() {
      await userService.getAllStudents().then(
        (response) => {
          setStudents(response?.data);
          if (user?.roles[0]?.id == 3) {
            setRecommendedStudents(
              response?.data?.filter(
                (student) =>
                  student.enabled &&
                  student?.cv?.about?.domaine ==
                  user?.company?.aboutCompany?.domaine
              )
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    getAllCompanies();
    getAllStudents();
  }, []);
  const handleClick = (id) => {
    history.push("/view/" + id);
    window.location.reload();
  };
  return (
    <div className={styles.feed}>
      <div className={styles.block}>
        <h1 className={styles.title}>All Companies</h1>
        {companies
          ?.filter((company) => company.enabled && company.company.flag)
          ?.map(
            (company, index) =>
              user?.id != company?.id && (
                <div className={styles.company}>
                  <img
                    src={"https://picsum.photos/400/200?random=" + index++}
                    alt=""
                  />
                  <Avatar
                    src={
                      userService.imageLink +
                      company.company.companyImage
                    }
                    className={styles.company_avatar}
                    alt="Image of "
                  />
                  <h2>{company?.companyName}</h2>
                  <h5>{company?.email}</h5>
                  <h6>{Math.floor(Math.random() * 1000)}</h6>
                  <Button
                    className={styles.Button}
                    onClick={() => handleClick(company?.id)}
                    variant="outlined"
                    color="primary"
                  >
                    View Profile
                  </Button>
                </div>
              )
          )}
      </div>

      {user?.roles[0]?.id == 1 && recommnededCompanies?.length != 0 && (
        <div className={styles.block}>
          <h1 className={styles.title}>Recommended Companies for you</h1>
          {companies
            ?.filter(
              (company) =>
                company.enabled &&
                company?.company?.aboutCompany?.domaine ==
                user?.cv?.about?.domaine
            )
            ?.map(
              (company, index) =>
                user?.id != company?.id && (
                  <div className={styles.company}>
                    <img
                      src={"https://picsum.photos/400/200?random=" + index++}
                      alt=""
                    />
                    <Avatar
                      src={
                        userService.imageLink +
                        company.company.companyImage
                      }
                      className={styles.company_avatar}
                      alt="Image of "
                    />
                    <h2>{company?.companyName}</h2>
                    <h5>{company?.email}</h5>
                    <h6>{Math.floor(Math.random() * 1000)}</h6>
                    <Button
                      className={styles.Button}
                      onClick={() => handleClick(company?.id)}
                      variant="outlined"
                      color="primary"
                    >
                      View Profile
                    </Button>
                  </div>
                )
            )}
        </div>
      )}

      {user?.roles[0]?.id == 3 && recommendedStudents?.length != 0 && (
        <div className={styles.block}>

          <h1 className={styles.title}>Recommended Students for you</h1>
          {students
            ?.filter(
              (student) =>
                student.enabled &&
                student?.cv?.about?.domaine ==
                user?.company?.aboutCompany?.domaine
            )
            ?.map(
              (student, index) =>
                user?.id != student?.id && (
                  <div className={styles.company}>
                    <img
                      src={"https://picsum.photos/400/200?blur?random=" + index}
                      alt=""
                    />
                    <Avatar
                      src={
                        userService.imageLink +
                        student.cv.image
                      }
                      className={styles.company_avatar2}
                      alt="Image of "
                    />
                    <h2>{student?.cv.name}</h2>
                    <h5>{student?.email}</h5>
                    <h6>{Math.floor(Math.random() * 1000)}</h6>
                    <Button
                      className={styles.Button}
                      variant="outlined"
                      onClick={() => handleClick(student?.id)}
                      color="primary"
                    >
                      View Profile
                    </Button>
                  </div>
                )
            )}
        </div>
      )}
      <div className={styles.block}>
        <h1 className={styles.title}>Students</h1>
        {students
          ?.filter((student) => student.enabled && student.cv.flag)
          ?.map(
            (student, index) =>
              user?.id != student?.id && (
                <div className={styles.company}>
                  <img
                    src={"https://picsum.photos/400/200?blur?random=" + index}
                    alt=""
                  />
                  <Avatar
                    src={
                      userService.imageLink +
                      student.cv.image
                    }
                    className={styles.company_avatar2}
                    alt="Image of "
                  />
                  <h2>{student?.cv.name}</h2>
                  <h5>{student?.email}</h5>
                  <h6>{Math.floor(Math.random() * 1000)}</h6>
                  <Button
                    className={styles.Button}
                    variant="outlined"
                    onClick={() => handleClick(student?.id)}
                    color="primary"
                  >
                    View Profile
                  </Button>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default Feed;
