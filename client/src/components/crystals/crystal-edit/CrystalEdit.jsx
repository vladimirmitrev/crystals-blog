import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Path from '../../../paths';
import styles from './CrystalEdit.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as crystalService from '../../../services/crystalService';
import { NotificationContext, types } from '../../../contexts/NotificationContext';
import { pathToUrl } from '../../../utils/pathUtils';
import AuthContext from '../../../contexts/authContext';

import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CrystalEdit = () => {
  const { showNotification } = useContext(NotificationContext);
  const { loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const { crystalId } = useParams();
  const [crystal, setCrystal] = useState({
    name: '',
    color: '',
    appearance: '',
    rarity: '',
    source : '',
    healing : '',
    imageUrl : '',
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      crystalService.getOne(crystalId)
      .then(result => {
        if (result._ownerId != loggedUserId) {
          showNotification('You are not authorized to edit this crystal.', types.error);
          navigate(Path.Crystals);
        } else {
          setCrystal(result)
        }
        })
        .catch(err => {
          showNotification('Error fetching crystal data.', types.error);
          navigate(Path.Crystals);
        })
        .finally(() => setLoading(false));
    }, [crystalId, loggedUserId, navigate, showNotification]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: crystal.name,
            color: crystal.color,
            appearance: crystal.appearance,
            rarity: crystal.rarity,
            source: crystal.source,
            healing: crystal.healing,
            imageUrl: crystal.imageUrl,
        },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name should be at least 3 characters')
        .max(30, 'Name should be no longer than 30 characters')
        .required('Name is required'),
      color: Yup.string()
        .min(3, 'Color should be at least 3 characters')
        .max(64, 'Color should be no longer than 64 characters')
        .required('Color is required'),
        appearance: Yup.string()
        .min(4, 'Appearance should be at least 4 characters')
        .max(256, 'Appearance should be no longer than 256 characters')
        .required('Appearance is required'),
        rarity: Yup.string()
        .min(3, 'Rarity should be at least 3 characters')
        .max(128, 'Rarity should be no longer than 128 characters')
        .required('Source is required'),
        source: Yup.string()
        .min(3, 'Source should be at least 3 characters')
        .max(128, 'Source should be no longer than 128 characters')
        .required('Source is required'),
        healing: Yup.string()
        .min(6, 'Healing should be at least 6 characters')
        .max(2048, 'Healing should be no longer than 2048 characters')
        .required('Healing is required'),
        imageUrl: Yup.string().url('Image should be an URL')
        .required('Image URL is required'),
    
    }),
    onSubmit: async (values) => {
        const crystalData = values;
        try {
            await crystalService.edit(crystalId, crystalData);
            showNotification('You successfully edited the crystal!', types.success);
            navigate(Path.Crystals);
        } catch (err) {
            showNotification(err.message, types.error);
            // console.log(error);
        }
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div
      className={`col-lg-4 col-md-12 wow animated slideInRight ${styles.editForm}`}
      data-wow-delay="2s"
    >
      <form onSubmit={formik.handleSubmit}>
        <h1>Edit Crystal <FontAwesomeIcon icon={faGem}/></h1>
        <div className="row g-3">
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label htmlFor="name">Name</label>
              {formik.touched.name && formik.errors.name ? (
                <p className={styles.inputError}>{formik.errors.name}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Color"
                name="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.color}
              />
              <label htmlFor="color">Color</label>
              {formik.touched.color && formik.errors.color ? (
                <p className={styles.inputError}>{formik.errors.color}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="appearance"
                placeholder="Appearance"
                name="appearance"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.appearance}
              />
              <label htmlFor="appearance">Appearance</label>
              {formik.touched.appearance && formik.errors.appearance ? (
                <p className={styles.inputError}>{formik.errors.appearance}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="rarity"
                placeholder="Rarity"
                name="rarity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rarity}
              />
              <label htmlFor="rarity">Rarity</label>
              {formik.touched.rarity && formik.errors.rarity ? (
                <p className={styles.inputError}>{formik.errors.rarity}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="source"
                placeholder="Source"
                name="source"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.source}
              />
              <label htmlFor="source">Source</label>
              {formik.touched.source && formik.errors.source ? (
                <p className={styles.inputError}>{formik.errors.source}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea
                type="text"
                className="form-control"
                id="healing"
                placeholder="Healing"
                name="healing"
                rows={4} cols={40}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.healing}
              />
              <label htmlFor="healing">Healing</label>
              {formik.touched.healing && formik.errors.healing ? (
                <p className={styles.inputError}>{formik.errors.healing}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="Image"
                name="imageUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imageUrl}
              />
              <label htmlFor="imageUrl">Image URL</label>
              {formik.touched.imageUrl && formik.errors.imageUrl ? (
                <p className={styles.inputError}>{formik.errors.imageUrl}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12 d-flex gap-3 justify-content-around">
            <Link to={pathToUrl(Path.CrystalDetails, { crystalId })} 
                className="btn details-btn btn-info rounded-3">Back to crystal details
            </Link>
            <button className={`btn btn-primary w-100 py-3 ${styles.editBtn}`} type="submit">
              Edit Crystal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrystalEdit;
